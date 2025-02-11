# Makefile
.PHONY: run-backend run-frontend install


default: runf

runf:
	npm install

startf:
	npm run dev

install:
	cd backend && pip install -r requirements.txt
	npm install

run-backend:
	cd backend && python app.py

run-frontend:
	npm run dev
#	cd frontend && npm run dev

start:
	make -j2 run-backend run-frontend
