import { useState,useEffect,useRef } from 'react'
import './App.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import domtoimage from 'dom-to-image-more';


function App() {
  const [code, setCode] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const codeRef = useRef(null);
  const previewRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      delete codeRef.current.dataset.highlighted;
      codeRef.current.className = 'language-javascript';
      hljs.highlightElement(codeRef.current);
    }
  }, [code]);

  
    const download = async ()=> {
        setIsDownloading(true);
        try {
        const dataUrl = await domtoimage.toPng(previewRef.current, {scale:2, backgroundColor: 'linear-gradient(135deg, rgba(102, 126, 234, 0.6) 0%, rgba(118, 75, 162, 0.6) 25%, rgba(240, 147, 251, 0.6) 50%, rgba(245, 87, 108, 0.6) 75%, rgba(79, 172, 254, 0.6) 100%)',
          style: {
            transform: 'scale(1)',
            transformOrigin: 'top left',
          },});
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'code-shot.png';
        link.click();
        } catch(err) {
            console.log(err);
        } finally{
            setIsDownloading(false);
        }
    }

  return (
    <div className='bg-gray-200 h-screen'>

    <div className="md:flex p-10 gap-4 ">
      
      <textarea
        className="md:w-1/2 p-4 resize-none font-mono mb-4 text-sm rounded-2xl w-full bg-white"
        placeholder="Enter your code here"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{
          border: '2px solid transparent',
          background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, rgba(102, 126, 234, 0.6) 0%, rgba(118, 75, 162, 0.6) 25%, rgba(240, 147, 251, 0.6) 50%, rgba(245, 87, 108, 0.6) 75%, rgba(79, 172, 254, 0.6) 100%) border-box'
        }}
      />

      
      <div
        ref={previewRef}
        className="preview-container w-full md:w-1/2 rounded-2xl shadow-xl text-white pt-8 pl-8 pr-9 pb-9"
        style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.6) 0%, rgba(118, 75, 162, 0.6) 25%, rgba(240, 147, 251, 0.6) 50%, rgba(245, 87, 108, 0.6) 75%, rgba(79, 172, 254, 0.6) 100%)'
        }}
      >


{/* bg-[rgba(255,255,255,0.15)] */}
        <div 
          className='glass-content bg-black/30 backdrop-blur-lg rounded-2xl w-full border border-white/20 shadow-inner min-h-full'
        >
        <pre className="whitespace-pre-wrap break-words text-sm overflow-visible shadow-none p-0 m-0">
          <code
            ref={codeRef}
            className="language-javascript"
          >
            {code}
          </code>
        </pre>
        </div>
      </div>
    </div>

    <div className='flex justify-center '>
           <button 
             onClick={download}
             disabled={isDownloading}
             className='rounded-2xl p-3 px-6 text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
             style={{
               border: '2px solid transparent',
               background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.4) 0%, rgba(118, 75, 162, 0.4) 100%) padding-box, linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%) border-box'
             }}
           >
                 Download Screenshot
           </button>
        </div>

    </div>
  )
}

export default App


