// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const users = []; // In-memory user storage (replace with a database in production)

export const register = async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user
  const user = { username, password: hashedPassword };
  users.push(user);

  res.status(201).json({ message: 'User registered successfully' });
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  // Find user
  const user = users.find(user => user.username === username);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  // Validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  // Generate JWT
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
};
