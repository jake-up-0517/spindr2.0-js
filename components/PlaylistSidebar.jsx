export default function PlaylistSidebar({ params }) {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <div className="form-control w-4/5 h-4/5 mt-8 px-3 py-1 rounded-xl overflow-scroll border-2 border-solid border-secondary">
        {/* {checkboxes} */}
      </div>
      <button className="btn btn-md btn-accent">Get Recs</button>
    </div>
  );
}
