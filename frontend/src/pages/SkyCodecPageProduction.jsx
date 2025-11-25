import React, { useState, useCallback } from 'react';
import { Upload, Download, FileCode, Lock, Zap, Shield, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

const API_BASE_URL = 'https://sky.softdab.tech';

export default function SkyCodecPage() {
  const [file, setFile] = useState(null);
  const [compressing, setCompressing] = useState(false);
  const [decompressing, setDecompressing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Drag and drop handlers
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setResult(null);
    setError(null);
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const compressFile = async () => {
    if (!file) return;

    setCompressing(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', file.name);

      const response = await fetch(`${API_BASE_URL}/api/compress`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Compression failed: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCompressing(false);
    }
  };

  const downloadCompressed = async () => {
    if (!result?.file_id) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/download/${result.file_id}`);
      
      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = result.filename || `${file.name.split('.')[0]}_compressed.sky`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err.message);
    }
  };

  const decompressFile = async () => {
    if (!file || !file.name.endsWith('.sky')) {
      setError('Please upload a .sky file for decompression');
      return;
    }

    setDecompressing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', file.name);

      const response = await fetch(`${API_BASE_URL}/api/decompress`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Decompression failed');
      }

      const data = await response.json();
      
      // Download decompressed file
      const downloadResponse = await fetch(`${API_BASE_URL}/api/download/${data.file_id}`);
      
      if (!downloadResponse.ok) {
        throw new Error('Download failed');
      }

      const blob = await downloadResponse.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = data.original_name || file.name.replace('.sky', '');
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setResult(null);
      setFile(null);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setDecompressing(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const formatCompressionRatio = (ratio) => {
    if (typeof ratio === 'number') {
      return `${(ratio * 100).toFixed(2)}%`;
    }
    return ratio;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <FileCode className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">SkyCodec</h1>
              <p className="text-purple-300 text-sm">Advanced File Compression Technology</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Features Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
              <Lock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold mb-1">Secure</h3>
              <p className="text-gray-400 text-sm">Advanced encryption algorithms</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold mb-1">Fast</h3>
              <p className="text-gray-400 text-sm">LZ77 + RLE + Huffman + Delta</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
              <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h3 className="text-white font-semibold mb-1">Private</h3>
              <p className="text-gray-400 text-sm">Files auto-delete after processing</p>
            </div>
          </div>

          {/* Upload Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              {file && file.name.endsWith('.sky') ? 'Decompress Your Files' : 'Compress Your Files'}
            </h2>
            
            {/* Drag & Drop Area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                dragActive
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              
              {file ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-white">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="font-semibold">{file.name}</span>
                  </div>
                  <p className="text-gray-400">{formatFileSize(file.size)}</p>
                  {file.name.endsWith('.sky') && (
                    <p className="text-purple-300 text-sm">Ready for decompression</p>
                  )}
                  <button
                    onClick={resetForm}
                    className="text-purple-400 hover:text-purple-300 text-sm underline"
                  >
                    Choose different file
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-white text-lg mb-2">
                    Drag & drop your file here
                  </p>
                  <p className="text-gray-400 mb-4">or</p>
                  <label className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg cursor-pointer transition-colors">
                    Browse Files
                    <input
                      type="file"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                  </label>
                  <p className="text-gray-500 text-sm mt-4">
                    Upload any file to compress or .sky file to decompress
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {file && !result && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {!file.name.endsWith('.sky') && (
                  <button
                    onClick={compressFile}
                    disabled={compressing}
                    className="py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
                  >
                    {compressing ? (
                      <span className="flex items-center justify-center gap-2">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Compressing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Zap className="w-5 h-5" />
                        Compress File
                      </span>
                    )}
                  </button>
                )}
                {file.name.endsWith('.sky') && (
                  <button
                    onClick={decompressFile}
                    disabled={decompressing}
                    className="py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg md:col-span-2"
                  >
                    {decompressing ? (
                      <span className="flex items-center justify-center gap-2">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Decompressing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Upload className="w-5 h-5" />
                        Decompress & Download
                      </span>
                    )}
                  </button>
                )}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-semibold">Error</p>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Results */}
            {result && (
              <div className="mt-6 p-6 bg-green-500/10 border border-green-500/50 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-bold text-white">Compression Successful!</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-black/20 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">Original Size</p>
                    <p className="text-white font-bold text-lg">{formatFileSize(result.original_size)}</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">Compressed Size</p>
                    <p className="text-white font-bold text-lg">{formatFileSize(result.compressed_size)}</p>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-1">Compression Ratio</p>
                    <p className="text-green-400 font-bold text-lg">{formatCompressionRatio(result.compression_ratio)}</p>
                  </div>
                </div>

                {result.algorithm && (
                  <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <p className="text-blue-300 text-sm">
                      <strong>Algorithm:</strong> {result.algorithm}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                  <button
                    onClick={downloadCompressed}
                    className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Compressed File
                  </button>
                </div>

                <button
                  onClick={resetForm}
                  className="w-full mt-4 py-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Compress Another File
                </button>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Upload Your File</h4>
                  <p className="text-sm">Select or drag & drop any file to compress or .sky file to decompress</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Advanced Algorithms</h4>
                  <p className="text-sm">File is processed using LZ77, RLE, Huffman, and Delta compression algorithms</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-400 font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Download Results</h4>
                  <p className="text-sm">Get your compressed .sky file or decompress back to original format</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
              <p className="text-yellow-400 text-sm">
                <strong>Privacy Notice:</strong> All files are automatically deleted from our servers after processing for your security.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-gray-400 text-sm">
            SkyCodec © 2025 - Advanced File Compression Technology
          </p>
        </div>
      </footer>
    </div>
  );
}
