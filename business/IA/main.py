import os
import shutil
import glob
from flask import Flask, render_template, send_file, request
import io
import subprocess
import json

dockerWorkspacePath = '/usr/src/app/workspace/'

app = Flask(__name__)

@app.route('/')
def hello_world():
    return "hello_world"

@app.route('/executeAlgo', methods=['POST'])
def executeAlgo():
    res = ''
    shutil.copy('basic_python.py', dockerWorkspacePath)
    requestJson = request.get_json()
    argArray = ['python', (dockerWorkspacePath + requestJson['Name']), (dockerWorkspacePath + requestJson['Folder'])]

    process = subprocess.Popen(argArray, 
        stdout=subprocess.PIPE,
        universal_newlines=True)

    while True:
        output = process.stdout.readline()
        res = res + output.strip()
        return_code = process.poll()
        if return_code is not None:
            break
    return res

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5009)
    