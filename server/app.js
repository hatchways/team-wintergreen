const colors = require( "colors" );
const path = require( "path" );
const http = require( "http" );
const express = require( "express" );
const socketio = require( "socket.io" );
const { notFound, errorHandler } = require( "./middleware/error" );
const connectDB = require( "./db" );
const { join } = require( "path" );
const cookieParser = require( "cookie-parser" );
const logger = require( "morgan" );
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { uploadFile } = require("./utils/s3");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const profileRouter = require("./routes/profile");
const conversationRouter = require("./routes/conversation");
const availabilityRouter = require("./routes/availability");
const bookingRouter = require("./routes/booking");
const stripeRouter = require("./routes/stripe");
const imageRouter = require("./routes/image");

const { json, urlencoded } = express;
const jwt = require("jsonwebtoken");
const { protectSocket } = require("./middleware/auth");

const onlineUsers = require("./onlineUsers");
const { filterInPlace } = require("./utils/helpers");

connectDB();
const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

io.use(protectSocket);

io.on("connection", (socket) => {
  if (!onlineUsers.some(user => user.userId === socket.decoded.id)) {
    onlineUsers.push({userId: socket.decoded.id, socketId: socket.id});
  }

  socket.on("notification", (notification) => {
    if (onlineUsers.some(user => user.userId === notification.receivedBy)) {
      const user = onlineUsers.find(user => user.userId === notification.receivedBy);
      socket.to(user.socketId).emit("notification", notification);
    }
  });

  socket.on("disconnect", () => {
    filterInPlace(onlineUsers, (user) => {
      return user.userId !== socket.decoded.id
    });
    console.log(`User ${socket.decoded.id} is offline.`);
  });
});

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/profile", profileRouter);
app.use("/availability", availabilityRouter);
app.use("/stripe", stripeRouter);
app.use("/image", imageRouter);
app.use("/bookings", bookingRouter);
app.use("/conversations", conversationRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname), "client", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = { app, server };
