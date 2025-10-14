#!/usr/bin/env node

const FtpDeploy = require('ftp-deploy');
const path = require('path');
const fs = require('fs');

const ftpDeploy = new FtpDeploy();

// FTP Configuration - замените на ваши данные
const config = {
    user: process.env.FTP_USER || "your_username",
    password: process.env.FTP_PASSWORD || "your_password", 
    host: process.env.FTP_HOST || "ftp.your-host.com",
    port: process.env.FTP_PORT || 21,
    localRoot: path.join(__dirname, 'dist'),
    remoteRoot: process.env.FTP_REMOTE_ROOT || '/public_html/',
    include: ['*', '**/*'],
    exclude: [
        'dist/**/*.map',
        'node_modules/**',
        'node_modules/**/.*',
        '.git/**'
    ],
    deleteRemote: false, // Установить true для полной синхронизации
    forcePasv: true,
    sftp: false
};

console.log('🚀 Starting FTP deployment...');
console.log(`📁 Local: ${config.localRoot}`);
console.log(`🌐 Remote: ${config.host}${config.remoteRoot}`);

ftpDeploy.deploy(config)
    .then(res => {
        console.log('✅ Deployment completed successfully!');
        console.log(`📊 Uploaded ${res.length} files`);
    })
    .catch(err => {
        console.error('❌ Deployment failed:', err);
        process.exit(1);
    });

// Event handlers
ftpDeploy.on('uploading', function(data) {
    console.log(`⬆️  Uploading: ${data.filename}`);
});

ftpDeploy.on('uploaded', function(data) {
    console.log(`✅ Uploaded: ${data.filename}`);
});

ftpDeploy.on('log', function(data) {
    console.log(`📝 ${data}`);
});