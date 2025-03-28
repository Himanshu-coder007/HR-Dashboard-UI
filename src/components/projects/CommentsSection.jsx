import { FiMessageSquare } from 'react-icons/fi';

const CommentsSection = ({ 
  comments, 
  teamMembers, 
  newComment, 
  onCommentChange, 
  onAddComment 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Discussion</h2>
      
      <div className="space-y-4 mb-6">
        {comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment.id} className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-800">
                  {teamMembers.find(m => m.id === comment.author)?.name || 'Unknown'}
                </span>
                <span className="text-xs text-gray-500">{comment.date}</span>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No comments yet. Start the discussion!</p>
        )}
      </div>
      
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 border rounded-lg px-4 py-2"
          value={newComment}
          onChange={(e) => onCommentChange(e.target.value)}
        />
        <button
          onClick={onAddComment}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FiMessageSquare />
        </button>
      </div>
    </div>
  );
};

export default CommentsSection;