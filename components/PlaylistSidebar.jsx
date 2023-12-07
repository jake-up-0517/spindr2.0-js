export default function PlaylistSidebar({ params }) {
  return (
    <div className="w-full h-screen m-4 flex flex-col justify-between items-center">
      <div className="form-control w-4/5 h-[65%] mt-1 px-3 py-1 rounded-xl overflow-scroll border-2 border-solid border-secondary">
        {/* {checkboxes} */}
      </div>
      <button className="btn btn-lg btn-accent mb-32">Get Recs</button>
    </div>
  );
}
