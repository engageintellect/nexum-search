import { FaBars } from "react-icons/fa";

function Nav() {
  return (
    <div className="navbar bg-base-100 max-w-3xl mx-auto">
      <div className="flex-1">
        <a className="btn btn-outline normal-case text-xl drop-shadow shadow" href="/">
          <div>
            Ne<span className="text-purple-500">x</span>um
          </div>
        </a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <FaBars className="w-5 h-5" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href={process.env.NEXT_PUBLIC_WIKI_URL} target="_blank">
                Wiki
              </a>
            </li>

            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a
                href={`${process.env.NEXT_PUBLIC_WIKI_URL}/ai`}
                target="_blank"
              >
                ET-GPT
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;
