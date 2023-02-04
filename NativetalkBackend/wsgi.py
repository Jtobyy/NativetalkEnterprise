# will serve as the entry point for our application.
# This will tell our Gunicorn server how to interact with the application. 

from server import app as application


if __name__ == "__main__":
    application.run()
