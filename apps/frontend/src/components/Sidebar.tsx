export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-slate-800">
      <div className="p-4">
        <h1 className="text-2xl font-bold">
          MailPilot 🚀
        </h1>
      </div>

      <div className="px-4">
        <button className="w-full rounded-lg bg-slate-800 p-3 text-left hover:bg-slate-700">
          + New Chat
        </button>
      </div>

      <div className="mt-6 px-4 space-y-2">
        <div className="rounded-lg p-3 hover:bg-slate-900 cursor-pointer">
          Inbox Summary
        </div>

        <div className="rounded-lg p-3 hover:bg-slate-900 cursor-pointer">
          Unread Emails
        </div>

        <div className="rounded-lg p-3 hover:bg-slate-900 cursor-pointer">
          Important Emails
        </div>
      </div>
    </aside>
  );
}