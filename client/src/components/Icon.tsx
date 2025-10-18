type IconName =
  | 'doc' | 'calendar' | 'chart' | 'check' | 'uncheckbox' | 'checkbox'
  | 'chevron-left' | 'chevron-right' | 'chevron-up' | 'chevron-down'
  | 'minus' | 'plus' | 'closed';

export function Icon({name, className='w-5 h-5'}:{name:IconName; className?:string}) {
  const p = {
    doc:            <path d="M6 2h6l4 4v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM16 2v4h4" stroke="currentColor" strokeWidth="1.5" fill="none"/>,
    calendar:       <path d="M6 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 6h18M10 2v4M20 2v4" stroke="currentColor" strokeWidth="1.5" fill="none"/>,
    chart:          <path d="M5 20h18M9 18V8M15 18V4M21 18V12" stroke="currentColor" strokeWidth="1.5" fill="none"/>,
    check:          <path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="2" fill="none"/>,
    uncheckbox:     <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>,
    checkbox:       <g><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="currentColor"/><path d="M7 12l3 3 7-7" stroke="#fff" strokeWidth="2" fill="none"/></g>,
    'chevron-left': <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" fill="none"/>,
    'chevron-right':<path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none"/>,
    'chevron-up':   <path d="M6 14l6-6 6 6" stroke="currentColor" strokeWidth="2" fill="none"/>,
    'chevron-down': <path d="M6 10l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none"/>,
    minus:          <path d="M5 12h14" stroke="currentColor" strokeWidth="2"/>,
    plus:           <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2"/>,
    closed:         <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2"/>,
  }[name];
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true">{p}</svg>;
}
