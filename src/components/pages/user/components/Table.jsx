import React, { useState } from "react";
import ActionMenu from "./ActionMenu";

// New DeleteConfirmationModal component
const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete this user?</p>
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Table = ({
  users,
  type,
  onSuspend,
  handleBlock,
  onView,
  action,
  action2,
  onDelete,
  action3,
  onUserSelection,
  onSelectAll,
  isAllSelected,
  selectedUsers,
  onPendingView,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete(userToDelete);
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const renderCell = (content) => {
    return content ? content : '--';
  };

  return (
    <div className="max-w-full w-full max-h-[90%] min-h-[85%]">
      <div className="w-full h-full overflow-scroll">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              {/* {type === "accepted" && (
                <th className="py-2 min-w-32 px-4 border-b">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={onSelectAll}
                  />
                </th>
              )} */}
              <th className="py-2 min-w-32 px-4 border-b">Sno</th>
              <th className="py-2 min-w-32 px-4 border-b">First Name</th>
              <th className="py-2 min-w-32 px-4 border-b">Email</th>
              <th className="py-2 min-w-32 px-4 border-b">Country</th>
              <th className="py-2 min-w-32 px-4 border-b">Visa Type</th>
              {type === "accepted" && (
                <>
                  <th className="py-2 min-w-40 px-4 border-b">Duration</th>
                  <th className="py-2 min-w-48 px-4 border-b">Status</th>
                </>
              )}
              <th className="py-2 min-w-32 px-4 border-b">createdAt</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user?.id || index}
                  className={`text-center ${
                    selectedUsers?.includes(user?.id) ? "bg-blue-100" : ""
                  }`}
                >
                  {/* {type === "accepted" && (
                    <td className="py-1 min-w-32 px-4 border-b">
                      <input
                        type="checkbox"
                        checked={selectedUsers?.includes(user?.id)}
                        onChange={() => onUserSelection(user?.id)}
                      />
                    </td>
                  )} */}
                  <td className="py-1 min-w-32 px-4 border-b">{user?.s_no || "="}</td>
                  <td className="py-1 min-w-32 px-4 border-b">
                    {renderCell(user?.first_name)}
                  </td>
                  <td className="py-1 min-w-32 px-4 border-b">
                    {renderCell(user?.email)}
                  </td>
                  <td className="py-1 px-4 border-b">
                    {user?.status === "pending" ? (
                      <span className="text-red-500">
                        {renderCell(user?.status)}
                      </span>
                    ) : user?.is_suspended ? (
                      <span className="text-red-400">suspended</span>
                    ) : (
                      <span className="text-green-400">active</span>
                    )}
                  </td>
                  <td className="py-1 min-w-48 px-4 border-b">
                    {renderCell(user?.sector_title)}
                  </td>
                  {type === "accepted" && (
                    <>
                      <td className="py-1 min-w-40 text-black font-normal px-4 border-b">
                        {renderCell(user?.name)}
                      </td>
                      <td className="py-1 min-w-48 px-4 text-black font-normal border-b">
                        {renderCell(user?.city)}
                      </td>
                    </>
                  )}
                  <td className="py-1 min-w-32 px-4 border-b">
                    {renderCell(user?.created_at?.slice(0, 10))}
                  </td>
                  <td className="py-1 px-4 border-b">
                    <ActionMenu
                      viewpandingUser={() => onPendingView(user?.id)}
                      onView={() => onView(user?.id)}
                      id={user?.id}
                      action3={action3}
                      action2={action2}
                      onBlock={() => handleBlock(user?.id)}
                      action={user?.is_suspended ? "active" : action}
                      ondeleted={() => handleDeleteClick(user?.id)}
                      onSuspend={() => onSuspend(user?.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="py-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Table;