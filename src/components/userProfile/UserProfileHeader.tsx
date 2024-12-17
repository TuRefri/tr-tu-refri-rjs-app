import React from "react";

interface UserProfileHeaderProps {
  avatarUrl: string;
  loadingUserData: boolean;
  editProfile: boolean;
  setEditProfile: (value: boolean) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  avatarInputRef: React.RefObject<HTMLInputElement>;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  avatarUrl,
  loadingUserData,
  editProfile,
  setEditProfile,
  handleImageChange,
  avatarInputRef,
}) => {
  return (
    <header className="w-full">
      <div className="relative flex items-center justify-center w-full h-36 bg-gray-300 rounded-t-md">
      <svg className="w-10 h-10 text-gray-200 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
          </svg>
          <div className='z-10 absolute -bottom-[34px] left-4 p-1 bg-[#f2f2f2] rounded-full h-20 w-20 overflow-hidden'>
          {editProfile ? (
            <div className="w-full h-full rounded-full">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="avatarInput"
                ref={avatarInputRef}
              />
              <label
                htmlFor="avatarInput"
                className="relative w-[60px] h-[60px] cursor-pointer"
              >
                <div className="absolute bg-black opacity-50 w-full h-full flex justify-center items-center rounded-full">
                    <img
                      src={"/icons/edit_user_avatar.svg" }
                      alt="edit user"
                    />
                  </div>
                <img
                  src={avatarUrl}
                  className="w-full h-full rounded-full"
                  alt="User avatar"
                />
              </label>
            </div>
          ) : loadingUserData ? (
            <div className="animate-pulse w-full h-full rounded-full bg-gray-300" />
          ) : (
            <img
              src={avatarUrl}
              className="w-full h-full rounded-full"
              alt="User avatar"
            />
          )}
        </div>
        {!editProfile && (
          <button
            onClick={() => setEditProfile(true)}
            className="absolute top-6 right-4 bg-gray-400 px-3 py-1 text-xs text-white rounded-md active:bg-gray-500"
          >
            Editar perfil
          </button>
        )}
      </div>
    </header>
  );
};

export default UserProfileHeader;
