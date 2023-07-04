function Nav() {
  return (
    <div className="navbar bg-base-100 max-w-5xl mx-auto">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">
          <div>
            Ne<span className="text-purple-500">x</span>um
          </div>
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="https://project-nexum.vercel.app">Wiki</a>
          </li>
          <li>
            <details>
              <summary>AI</summary>
              <ul className="p-2 bg-base-100">
                <li>
                  <a href="https://project-nexum.vercel.app/ai">ET-GPT</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
