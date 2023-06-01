/* eslint-disable max-len */
export default function CopyClipBoard({content}: {content: string}) {
    return (
        <div onClick={() => navigator.clipboard.writeText(content)} className="text-[#94a3b8] hover:text-[#64748b] hover:cursor-pointer flex items-center">
            <svg width="16" height="16" fill="none" viewBox="0 0 14 14">
                <g>
                    <path data-follow-stroke="currentColor" d="M10.208 10.374v1.347a.82.82 0 0 1-.82.82h-7.11a.82.82 0 0 1-.82-.82V4.612a.82.82 0 0 1 .82-.82h1.363" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path data-follow-stroke="currentColor" d="M4.612 10.208h7.11a.82.82 0 0 0 .82-.82v-7.11a.82.82 0 0 0-.82-.82h-7.11a.82.82 0 0 0-.82.82v7.11c0 .453.367.82.82.82Z" stroke="currentColor" strokeLinejoin="round"></path>
                </g>
            </svg>
        </div>
    );
}
