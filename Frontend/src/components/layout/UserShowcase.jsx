import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './UserShowcase.css';

export default function UserShowcase({ variant = 'default', size = 'medium', showName = true }) {
  const { userProfile, currentUser } = useAuth();
  const [imageError, setImageError] = useState(false);

  const displayName = userProfile?.name || 
    currentUser?.displayName || 
    currentUser?.email?.split('@')[0] || 
    'User';

  const avatarUrl = userProfile?.avatar;

  const sizeClass = `user-showcase--${size}`;
  const variantClass = `user-showcase--${variant}`;

  return (
    <div className={`user-showcase ${sizeClass} ${variantClass}`}>
      <div className="user-showcase-content">
        <div className="user-showcase-avatar">
          {avatarUrl && !imageError ? (
            <img 
              src={avatarUrl} 
              alt={displayName}
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
              onError={(e) => {
                console.log('❌ Image failed to load:', avatarUrl);
                console.log('❌ Error event:', e);
                setImageError(true);
              }}
              onLoad={() => {
                console.log('✅ Image loaded successfully:', avatarUrl);
                setImageError(false);
              }}
            />
          ) : (
            <div className="avatar-placeholder">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        {showName && (
          <span className="user-showcase-name">{displayName}</span>
        )}
      </div>
    </div>
  );
}
