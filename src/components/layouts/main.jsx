import { useEffect, useMemo, useRef, useState } from 'react'
import logo from '../../assets/logox600.png'
import SearchContext from '../../contexts/SearchContext'
import Dialog from "../../components/dialog"


const MainLayout = ({ children, onPublish }) => {
    const [showFilter, setShowFilter] = useState(false)
    const toggleFilter = () => setShowFilter(prev => !prev)

    const [showPublish, setShowPublish] = useState(false)

    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const isDateRangeActive = dateFrom && dateTo
    const searchParams = useMemo(() => ({dateFrom, dateTo, searchQuery}), [dateFrom, dateTo, searchQuery])

    const removeFilters = () => {
        setDateFrom('')
        setDateTo('')
        setSearchQuery('')
    }

    useEffect(() => {
        window.addEventListener('click', event => {   
            if (!document.getElementById('searchbox').contains(event.target) && event.target.id !== "filter-btn"){
              setShowFilter(false)
            }
        })
    })

    const classes = {
        searchBox: `shadow focus-within:shadow-lg border w-full lg:w-3/4 rounded-lg bg-white ${showFilter ? 'absolute pb-1' : 'relative'}`,
        searchInput: `flex py-1 px-2 ${showFilter && 'border-b border-gray-200'}`,
        filterBtn: `rounded-lg text-sm font-medium py-2 px-4 border border-gray-300 ${isDateRangeActive ? 'bg-blue-600 text-white' : 'text-gray-700'}`,
        datePicker: 'border border-gray-300 p-1 rounded ml-3'
    }

    return (
        <div className="w-screen h-screen bg-white/60 overflow-y-scroll flex flex-col">
            <div className="py-5 md:sticky top-0 md:flex md:items-start px-10 z-20">
                <div className="flex-1">
                    <img style={{width: 200}} src={logo} alt="Ghibli Studios" className="mx-auto mb-2 md:m-0" />
                </div>
                <div className="flex-1 flex justify-center relative" id="searchbox">
                    <div className={classes.searchBox}>
                        <div className={classes.searchInput}>
                            <input type="search" placeholder="Search films by author, director" className="flex-grow rounded-l-lg outline-none"
                                    onChange={e => setSearchQuery(e.target.value)} value={searchQuery} />
                            <div className="px-1 self-center hidden md:inline">
                                <button onClick={toggleFilter} className={classes.filterBtn}>
                                    {isDateRangeActive ? 'Filtering by date' : 'Select date'}
                                </button>
                            </div>
                            <button className="p-1 cursor-pointer" onClick={removeFilters}>
                                <i className="bx bx-x text-gray-400 text-xl align-middle" />
                            </button>
                        </div>
                        {showFilter && (
                            <div className="bg-white w-full p-3 text-gray-700">
                                <div className="font-bold mb-2">Release date</div>
                                <div className="flex items-center">
                                    <div>
                                        <div className="py-1 mb-1">From</div>
                                        <div className="py-1">To</div>
                                    </div>
                                    <div>
                                        <input type="date" min="1984-03-11" onChange={e => setDateFrom(e.target.value)}
                                            value={dateFrom} className={`${classes.datePicker} ml-3`} />
                                        <br />
                                        <input type="date" min={searchQuery.dateFrom} onChange={e => setDateTo(e.target.value)}
                                            value={dateTo} className={classes.datePicker} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex-1 flex mt-2">
                    <button id="filter-btn" onClick={toggleFilter} className={classes.filterBtn.concat(' border-md bg-white shadow border-none inline md:hidden')}>
                        {isDateRangeActive ? 'Filtering by date' : 'Select date'}
                    </button>
                    <div className="flex-grow " />
                    <button onClick={() => setShowPublish(true)} className="bg-blue-700 text-white text-sm font-bold rounded px-5 py-2">Publish</button>
                </div>
            </div>

            <div className="p-5 md:p-10 flex-1">
                <SearchContext.Provider value={searchParams}>
                    {children}
                </SearchContext.Provider>
            </div>
            <Dialog open={showPublish} width={500}>
                <div className="flex">
                    <div className="text-lg font-bold text-gray-700 flex-grow">Add new film</div>
                    <button className="cursor-pointer" onClick={() => setShowPublish(false)}>
                        <i className="bx bx-x self-center text-gray-400 text-xl" />
                    </button>
                </div>
                <PublishForm onSubmit={e => { onPublish(e) ; setShowPublish(false) }}/>
            </Dialog>
        </div>
    )
}

const PublishForm = ({ onSubmit }) => {
    const [thumb, setThumb] = useState('')
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [director, setDirector] = useState('')
    const [producer, setProducer] = useState('')
    const [description, setDescription] = useState('')
    
    const handleSubmit = e => {
        e.preventDefault()
        onSubmit({thumb, image, title, director, producer, description, release_date: new Date().getFullYear(), id: new Date().getMilliseconds()})
    } 

    return (
        <form onSubmit={handleSubmit}>
            <div className="mt-5 -mx-5">
                <div className="flex items-center px-5">
                    <div className="w-1/4 font-medium text-sm text-gray-800">
                        Thumbnail
                    </div>
                    <div className="w-3/4 py-3">
                        <FileUploader required onChange={setThumb}></FileUploader>
                    </div>
                </div>
                <div className="flex items-center bg-gray-100 px-5">
                    <div className="w-1/4 font-medium text-sm text-gray-800">
                        Portrait
                    </div>
                    <div className="w-3/4 py-3">
                        <FileUploader required onChange={setImage}></FileUploader>
                    </div>
                </div>
                <div className="flex items-center px-5">
                    <div className="w-1/4 font-medium text-sm text-gray-800">
                        Title
                    </div>
                    <div className="w-3/4 py-3">
                        <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="border-2 rounded py-1" />
                    </div>
                </div>
                <div className="flex items-center bg-gray-100 px-5">
                    <div className="w-1/4 font-medium text-sm text-gray-800">
                        Director
                    </div>
                    <div className="w-3/4 py-3">
                        <input required type="text" value={director} onChange={e => setDirector(e.target.value)} className="border-2 rounded py-1" />
                    </div>
                </div>
                <div className="flex items-center px-5">
                    <div className="w-1/4 font-medium text-sm text-gray-800">
                        Producer
                    </div>
                    <div className="w-3/4 py-3">
                        <input required type="text" value={producer} onChange={e => setProducer(e.target.value)} className="border-2 rounded py-1" />
                    </div>
                </div>
                <div className="flex items-center bg-gray-100 px-5">
                    <div className="w-1/4 font-medium text-sm text-gray-800">
                        Description
                    </div>
                    <div className="w-3/4 py-3">
                        <textarea required value={description} onChange={e => setDescription(e.target.value)} className="border-2 rounded" name="" id="" cols="30" rows="3" />
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <button className="w-full bg-blue-600 py-2 text-white rounded-lg font-bold text-sm">Publish</button>
            </div>
        </form>
    )
}
const FileUploader = (props) => {
    const [file, setFile] = useState('')
    const [label, setLabel] = useState('')
    const fileInputRef = useRef()

    const handleUpload = e => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => {
            setFile(reader.result)
            setLabel(file.name)
            props.onChange(reader.result)
        }
    }

    function handleClick() {
        if (fileInputRef.current) fileInputRef.current.click()
    }

    return (
        <div onClick={handleClick} className='rounded border border-gray-300 text-sm text-gray-700 font-bold px-3 py-2 w-min'>
            <input ref={fileInputRef} type="file" onChange={handleUpload} className="hidden" />
            <input {...props} type="text" disabled value={label} placeholder="Upload a file" className="w-24 border-1 placeholder:text-gray-500" />
        </div>
    )
}

export default MainLayout