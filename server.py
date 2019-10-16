#!/usr/bin/env python3

import http.server, socketserver, os

PORT=8080
Handler = http.server.SimpleHTTPRequestHandler

os.chdir("src")
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("serving at port", PORT)
    httpd.serve_forever()
