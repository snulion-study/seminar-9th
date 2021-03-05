#!/bin/bash
# usage: './run-seminar.sh' or 'bash run-seminar.sh'
# on linux: sed -i -e 's/\r$//' <file-name>

CHECK_OS="`uname -s`"

if [[ "$CHECK_OS" = "Darwin"* ]]; then # Do something under Mac OS X platform     
    echo "MAC"
    dir_name="bin"
    python_ver=""
elif [[ "$CHECK_OS" = "Linux"* ]]; then # Do something under GNU/Linux platform     
    echo "LINUX" 
    dir_name="bin"
    python_ver="3"
elif [[ "$CHECK_OS" = "MINGW32"* ]]; then # Do something under Windows NT platform     
    echo "WIN" 
    dir_name="Scripts"
    python_ver=""
elif [[ "$CHECK_OS" = "MINGW64"* ]]; then # Do something under Windows NT platform     
    echo "WIN" 
    dir_name="Scripts"
    python_ver=""
elif [[ "$CHECK_OS" = "CYGWIN"* ]]; then # Do something under Windows NT platform     
    echo "WIN"     
    dir_name="Scripts"
    python_ver=""
fi

# try-catch
{
    source .venv/$dir_name/activate # try to activate .venv
} || {
    echo "No virtual environment provided"
    python$python_ver -m venv .venv # make new virtual environment
    source .venv/$dir_name/activate
}
echo "Activated virtual environment [.venv/$dir_name/activate]"

python --version
pip --version

pip install --upgrade pip
pip install -r requirements.txt
# error: Microsoft Visual C++ 14.0 is required.
# Windows -> https://download.microsoft.com/download/5/F/7/5F7ACAEB-8363-451F-9425-68A90F98B238/visualcppbuildtools_full.exe
# Mac -> 
# Linux -> 
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
