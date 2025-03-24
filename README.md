# MRKMovies

## Backend Setup (Django REST) 
> [!NOTE]
> Before proceeding below make sure that you have `pip` installed on our computer. 
### 1. Create a virtual environment
   Navigate to the project root and run:
   ```bash
python -m venv env
  ```

### 2. Activate the virtual environment
  Navigate to the `env` folder and Type the following command:

```bash
env/Scripts/activate 
```

### 3. Install the dependencies in the virtual environment
   Navigate to the `backend` folder and type the following command

```bash
pip install -r requirements.txt
```

### 4. Run the backend server 
Make sure that you are in the `backend` folder and run the following command
```bash
python manage.py runserver 1234
```

### 5. Run Frontend 
Navigate to the `frontend` folder and type the following command after installing the node_modules. 

```bash
ng s 
```



