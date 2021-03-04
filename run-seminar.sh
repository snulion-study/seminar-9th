#!/bin/bash
# usage: ./run-seminar.sh

CHECK_OS="`uname -s`"

if [[ "$CHECK_OS" = "Darwin"* ]]; then # Do something under Mac OS X platform     
    echo "MAC"
    dir_name="bin"
elif [[ "$CHECK_OS" = "Linux"* ]]; then # Do something under GNU/Linux platform     
    echo "LINUX" 
    dir_name="bin"
elif [[ "$CHECK_OS" = "MINGW32"* ]]; then # Do something under Windows NT platform     
    echo "WIN" 
    dir_name="Scripts"
elif [[ "$CHECK_OS" = "MINGW64"* ]]; then # Do something under Windows NT platform     
    echo "WIN" 
    dir_name="Scripts"
elif [[ "$CHECK_OS" = "CYGWIN"* ]]; then # Do something under Windows NT platform     
    echo "WIN"     
    dir_name="Scripts"
fi

# try-catch
{
    source .venv/$dir_name/activate # try to activate .venv
} || {
    echo "No virtual environment provided"
    python -m venv .venv # make new virtual environment
    source .venv/$dir_name/activate
}
echo "Activated virtual environment [.venv/$dir_name/activate]"

pip install --upgrade pip
pip install -r requirements.txt
# error: Microsoft Visual C++ 14.0 is required. -> https://download.microsoft.com/download/5/F/7/5F7ACAEB-8363-451F-9425-68A90F98B238/visualcppbuildtools_full.exe
python manage.py makemigrations
python manage.py migrate
python manage.py runserver


###########################
###### previous code ######


#!/bin/bash
# usage: ./run-seminar.sh {path-to-virtual-environment-folder}
# if [ -z "$1" ] 
# then
#     echo "No virtual environment provided"
# else
#     echo "try activating virtual environment [@$1/bin/activate]"
#     source $1/bin/activate
# fi

# pip install --upgrade pip
# pip install -r requirements.txt 
# python manage.py makemigrations
# python manage.py migrate
# python manage.py runserver
