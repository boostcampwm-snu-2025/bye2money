set -e

# Start frontend project
echo "Frontend starting on :5173 ..."
cd ./vite-bye2money
npm install
npm run dev &

# Start backend server
echo "Backend starting on :3000 ..."
cd ../server
npm install
npm run dev

wait
