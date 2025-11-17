// context/UserContext.js
// 'use client';
// import { createContext, useState, useEffect } from 'react';

// export const UserContext = createContext(null);

// export function UserProvider({ children }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     fetch('/api/user/123')
//       .then(res => res.json())
//       .then(data => setUser(data))
//       .catch(err => console.error('Lỗi khi lấy user:', err));
//   }, []);

//   return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
// }
//Mục đích của thằng context này là để truyền props giá trị đi nhiều lớp khác nhau
//ví dụ như đăng nhập xong thì cần thông tin người dùng refresh token các kiểu thì nó
//sẽ truyền xuống cho các thằng dưới không cần phải gọi api nhiều lần
