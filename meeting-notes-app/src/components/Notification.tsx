// import React, { useEffect } from 'react';
// import { Snackbar, Typography } from '@mui/material';
//
// interface NotificationProps {
//     message: string;
//     onClose: () => void;
// }
//
// /**
//  * Notification component for displaying messages.
//  * Automatically closes after 3 seconds.
//  * @param message The message to display.
//  * @param onClose Callback function to close the notification.
//  */
// const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
//     // Automatically close the notification after 3 seconds
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             onClose(); // Close the notification
//         }, 3000);
//
//         return () => clearTimeout(timer); // Cleanup the timer on component unmount
//     }, [onClose]);
//
//     return (
//         <Snackbar open={Boolean(message)} autoHideDuration={3000} onClose={onClose}>
//             {/* Customizing the message UI */}
//             <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white', backgroundColor: 'rgb(53, 107, 180)', padding: '10px', borderRadius: '5px', minHeight: '60px', minWidth: '200px',fontSize: '1.2rem'  }}>
//                 {message}
//             </Typography>
//         </Snackbar>
//     );
// };
//
// export default Notification;
