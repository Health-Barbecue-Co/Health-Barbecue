import os
import shutil
import glob
import io
import subprocess
import json
import sys
from flask import Flask, render_template, send_file, request

dockerWorkspacePath = '/usr/src/app/workspace/'
algosWorkspacePath = dockerWorkspacePath + 'algos/'
dataWorkspacePath = dockerWorkspacePath + 'data/'

app = Flask(__name__)

@app.route('/')
def home():
    return "algo service is running."

@app.route('/executeAlgo', methods=['POST'])
def executeAlgo():
    res = ''
    requestJson = request.get_json()
    print(requestJson, file=sys.stderr)
    argArray = ['python', (algosWorkspacePath + requestJson['MainFile']), (dataWorkspacePath + requestJson['Folder'])]
    print(argArray, file=sys.stderr)
    # ToDo try
    process = subprocess.Popen(argArray, 
        stdout=subprocess.PIPE,
        universal_newlines=True)
    # Get log of executed python script
    while True:
        output = process.stdout.readline()
        res = res + output.strip()
        return_code = process.poll()
        if return_code is not None:
            break
    return res

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5009)
    