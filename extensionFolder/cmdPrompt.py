import sys
import json

log_file_path = r"C:\\Users\\chenh\\OneDrive - San Dieguito Union High School District\Documents\\extensionFolder\\log.txt"

def log_message(message):
    with open(log_file_path, "a") as logfile:
        logfile.write(message + "\n")
    print(f"Logged: {message}")

def main():
    while True:
        try:
            line = sys.stdin.readline()
            if line:
                try:
                    message = json.loads(line)
                    data = message.get('data', '')
                    log_message(data)
                except json.JSONDecodeError:
                    print("Error: Invalid JSON received.")
        except KeyboardInterrupt:
            break

if __name__ == "__main__":
    main()