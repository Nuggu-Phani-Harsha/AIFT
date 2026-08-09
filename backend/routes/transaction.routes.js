import express from 'express';
import multer from 'multer';
import {
  getTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  uploadReceipt
} from '../controllers/transaction.controller.js';
//import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    console.log('Uploaded file mimetype:', file.mimetype);
    console.log('Uploaded file name:', file.originalname);
    
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
      return cb(null, true);//no error allow upload
    } else {
      cb(new Error(`File type not allowed. Received: ${file.mimetype}. Only images (JPEG, PNG, WebP) and PDFs are allowed`));
    }
  }
});

// All routes are protected
//router.use(protect);

router.route('/')  // on '/' router if i get a GET request then i will call getTransactions and if i get a POST request then i will call createTransaction
  .get(getTransactions)
  .post(createTransaction);


router.route('/:id')
  .get(getTransaction)
  .put(updateTransaction)
  .delete(deleteTransaction);

router.post('/:id/receipt', upload.single('receipt'), uploadReceipt);

export default router;



//// routes -> controller -> service -> database


//// CSR -> CONTROLLER (CLIENT)-> SERVICE -> DATABASE