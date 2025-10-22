#!/bin/bash
echo "Testing rate limiting - sending 105 requests..."
for i in {1..105}; do
  response=$(curl -s -w "HTTP_CODE:%{http_code}" http://127.0.0.1:8080/health)
  if [[ "$response" == *"HTTP_CODE:429"* ]]; then
    echo "Request $i: RATE LIMITED ✅"
    break
  elif [[ "$response" == *"HTTP_CODE:200"* ]]; then
    echo "Request $i: OK"
  else
    echo "Request $i: ERROR - $response"
  fi
done
