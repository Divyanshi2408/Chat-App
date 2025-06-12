import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  unreadCounts: {}, // { userId: count }
  setUnreadCounts: (counts) => set({ unreadCounts: counts }),


  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      const selectedUserId = get().selectedUser?._id;
      const isCurrentChat = newMessage.senderId === selectedUserId;

      if (isCurrentChat) {
        // Append to current messages
        set({ messages: [...get().messages, newMessage] });
      } else {
        // Show notification toast
        toast.success(`New message from ${newMessage.senderName || "Someone"}`);

        // Increment unread count
        const prevCounts = get().unreadCounts;
        const currentCount = prevCounts[newMessage.senderId] || 0;

        set({
          unreadCounts: {
            ...prevCounts,
            [newMessage.senderId]: currentCount + 1,
          },
        });
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },
fetchUnreadCounts: async () => {
  try {
    const res = await axiosInstance.get("/messages/unread-counts");
    set({ unreadCounts: res.data });
  } catch (error) {
    console.error("Failed to fetch unread counts", error);
  }
}, // ✅ this comma is required

  
  clearUnreadCount: (userId) => {
    const updated = { ...get().unreadCounts };
    delete updated[userId];
    set({ unreadCounts: updated });
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
    if (selectedUser?._id) {
      get().clearUnreadCount(selectedUser._id);
    }
  },
}));
