import React, { useEffect } from "react";

const ModalNotify = ({ show, onClose, content, title }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!show) return null;

  return (
    <div className="fixed w-full h-full inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white h-full rounded-lg shadow-lg p-6 z-10 min-w-[60%] max-h-[80%]  max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-red-500 text-lg font-semibold"
          >
            X
          </button>
        </div>
        <div className=" rounded-lg  z-10 min-w-[99%] max-w-[99%]  max-h-[90%]  overflow-auto ">
          {title === "User Details" ? (
            <div className="max-w-full min-w-full max-h-[90%] min-h-[85%]  ">
              <table className="min-w-full min-h-[80%] bg-white overflow-auto">
                <thead>
                  <tr>
                    <>
                      <th className="py-2 min-w-32 px-4 border-b">S.no</th>
                      <th className="py-2 min-w-32 px-4 border-b">
                        First Name
                      </th>
                      <th className="py-2 min-w-32 px-4 border-b">Last Name</th>
                      <th className="py-2 min-w-44 px-4 border-b">Email</th>
                      <th className="py-2 min-w-44 px-4 border-b">Date</th>
                    </>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {content?.map((user, index) => (
                      <tr key={user?._id} className="text-center">
                        <td className="py-1 min-w-32 px-4 border-b">
                          {index + 1}
                        </td>
                        <td className="py-1 min-w-32 px-4 border-b">
                          {user?.firstName}
                        </td>
                        <td className="py-1 min-w-32 px-4 border-b">
                          {user?.lastName}
                        </td>
                        <td className="py-1 min-w-32 px-4 border-b">
                          {user?.email}
                        </td>
                        <td className="py-1 min-w-44 px-4 border-b">
                          {user?.createdAt?.slice(0, 10)}
                        </td>
                      </tr>
                    ))}
                  </>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="min-w-[99%] max-w-[99%]  max-h-[90%]  overflow-y-auto ">
              {!content?.includes("https:") ? (
                <p>{content}</p>
              ) : (
                <>
                  {title === "Youtube Link" ? (
                    <p>{content}</p>
                  ) : (
                    <img
                      src={content}
                      alt={title}
                      className="w-96 bg-cover h-96"
                    />
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalNotify;
