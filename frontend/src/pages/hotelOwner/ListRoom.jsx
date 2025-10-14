

import React, { useEffect, useState } from 'react';
import Title from '../../components/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';


const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const { axios, getToken, user,currency } = useAppContext();

  // ✅ Fetch rooms from backend
  const fetchRooms = async () => {
    try {
      const { data } = await axios.get('/api/rooms/owner', {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setRooms(data.rooms);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Toggle room availability (with instant UI update + animation)
  const toggleAvailability = async (roomId) => {
    // Optimistic UI update
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room._id === roomId
          ? { ...room, isAvailable: !room.isAvailable }
          : room
      )
    );

    try {
      const { data } = await axios.post(
        '/api/rooms/toggle-availability',
        { roomId },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
        fetchRooms(); // revert if failed
      }
    } catch (error) {
      toast.error(error.message);
      fetchRooms(); // revert if API fails
    }
  };

  // ✅ Fetch rooms when user is available
  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Room Listings"
        subTitle="View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users."
      />

      <p className="text-gray-800 mt-8">All Rooms</p>

      <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Facility
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium">
                Price / night
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rooms.length > 0 ? (
              rooms.map((item, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {item.roomType}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                    {item.amenities?.join(', ') || '—'}
                  </td>
                  <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                    {currency} {item.pricePerNight}
                  </td>

                  {/* ✅ Sliding Toggle Action */}
                  <td className="py-3 px-4 border-t border-gray-300 text-sm text-center">
                    <label className="relative inline-flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        onChange={() => toggleAvailability(item._id)}
                        checked={item.isAvailable}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-300 ease-in-out relative">
                        <span
                          className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out peer-checked:translate-x-5"
                        ></span>
                      </div>
                      <span className="ml-2 text-gray-700 text-sm group-hover:text-blue-600 transition-colors duration-200">
                        {item.isAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </label>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="py-4 text-center text-gray-500 border-t"
                >
                  No rooms found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;
