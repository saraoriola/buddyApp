const Answer = require('../models/Answer');

const VoteController = {
  async giveVote(req, res) {
    const { answerId } = req.params;

    try {
      const answer = await Answer.findById(answerId);

      if (!answer) {
        return res.status(404).json({ message: 'Answer not found' });
      }

      const userId = req.user._id;

      if (answer.votedBy.includes(userId)) {
        return res.status(400).json({ message: 'User has already voted for this answer' });
      }

      answer.votes += 1;
      answer.votedBy.push(userId);
      await answer.save();

      res.json({ message: 'Vote added successfully', answer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding vote' });
    }
  },

  async removeVote(req, res) {
    const { answerId } = req.params;

    try {
      const answer = await Answer.findById(answerId);

      if (!answer) {
        return res.status(404).json({ message: 'Answer not found' });
      }

      const userId = req.user._id; 

      if (answer.votedBy.includes(userId)) {
        answer.votes -= 1;
        answer.votedBy.pull(userId);
        await answer.save();
      }

      res.json({ message: 'Vote removed successfully', answer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error removing vote' });
    }
  },
};

module.exports = VoteController;
