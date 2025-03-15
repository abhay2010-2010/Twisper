const User = require("../schema/User.modal");

const getUserProfile = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(404).json("error in getUserProfile:", error.message);
        console.error(error.message);
    }
};


const FollowUnfollowUser = async (req, res) => {
    const { id } = req.params; // ✅ ID of the user to be followed/unfollowed
  
    try {
      // ✅ Find users
      const userToModify = await User.findById(id);
      const currentUser = await User.findById(req.user._id);
  
      // ✅ Check if both users exist
      if (!userToModify || !currentUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // ✅ Prevent self-following
      if (id === req.user._id.toString()) {
        return res.status(400).json({ error: "You cannot follow/unfollow yourself" });
      }
  
      // ✅ Check if the user is already being followed
      const isFollowing = currentUser.followings.includes(id);
  
      if (isFollowing) {
        // ✅ Unfollow logic
        currentUser.followings = currentUser.followings.filter(userId => userId.toString() !== id);
        userToModify.followers = userToModify.followers.filter(userId => userId.toString() !== req.user._id.toString());
  
        await currentUser.save();
        await userToModify.save();
  
        return res.status(200).json({ message: "User unfollowed successfully" });
      } else {
        // ✅ Follow logic
        currentUser.followings.push(id);
        userToModify.followers.push(req.user._id);
  
        await currentUser.save();
        await userToModify.save();
  
        return res.status(200).json({ message: "User followed successfully" });
      }
    } catch (error) {
      console.error("Error in follow/unfollow:", error.message);
      return res.status(500).json({ error: error.message });
    }
  };

module.exports = { getUserProfile, FollowUnfollowUser };
