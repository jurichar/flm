# backend/Dockerfile
FROM python:3.10

WORKDIR /app/backend

COPY . .

RUN chmod +x ./wait-for-it.sh
RUN chmod +x ./start.sh

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["./wait-for-it.sh", "db:5432", "--", "./start.sh"]