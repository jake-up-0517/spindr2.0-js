export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Playlists</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl" href="/home">
          SpindrPro
        </a>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/playlists">Playlists</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn" href="/api/auth/signout">
          Sign Out
        </a>
      </div>
    </div>
  );
}
