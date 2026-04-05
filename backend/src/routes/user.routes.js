import { registerUser, loginUser, getMe, updateUserProfile, deleteUser } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.delete("/me", protect, deleteUser);
router.put("/profile", protect, updateUserProfile);

export default router;
