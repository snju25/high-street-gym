import { X } from 'lucide-react';
import { useRef } from 'react';
import { Form } from 'react-router-dom';


const BookingPopup = ({onClose}) => {
    const popupRef = useRef()


    // closes popup if click away from the screen
    const closePopup = (e) =>{
        if(popupRef.current === e.target){
            onClose()
        }
    }
  return (
    <div ref={popupRef} onClick={closePopup} className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
       <div className='mt-10 flex flex-col gap-5 text-white'>
            <button onClick={onClose} className='place-self-end'><X size={30}/></button>
            <div className='bg-indigo-600 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4'>
                {/* class name */}
                <h1>Class Name</h1>
                <Form>
                    <p>Choose a trainer</p>
                    <select>
                        {/* map over the available trainer at taking that class */}
                    </select>

                <button >Confirm Booking Now</button>
                </Form>
            </div>
        </div> 
    </div>
  )
}
export default BookingPopup