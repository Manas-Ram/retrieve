
import React, { useEffect } from 'react'
import './Faq.css'
import image from "./bg.jpg";

const Faq = (props) => {

    const faq = [
        { question: "How does the Lost and Found web app work?", answer: "You can put an item up as lost. You can make it as specific as you want, detailing the last known location, the name, the description etc. It then goes to the catalog page, where your lost item, as well as everyone else's lost items are put in the catalog. You can then click on one of the items and complete another form to claim the item. " },
        { question: "What should I do if I've lost something?", answer: "If you've lost something, report the lost item with as many details as possible. This helps increase the chances of a successful find. I recommend regularly checking the website for updates on items gallery that match your description." },
        { question: "What should I do if I find a lost item?", answer: "If you find a lost item, please report the found item with accurate details. You have to upload a photo of the item to help with identification. This was you will help and owner find their lost item. If you can identify the name of the person, or you see in the catalog, contact the person." },
        { question: "How long does the process usually take? ", answer: "At the end of the day, the administration and security are in charge of the items going in and out. Don't expect to always get it back immediately, don't annoy faculty " },
        { question: "What if there is an expensive or valuable item that I lost? How could you prevent anyone from retrieving it as their own and stealing?", answer: "Chances are, if it is truly is a valuable item, you would've found it by now. Or faculty would email all students like they sometimes do showing the item and telling them to pick it up at the office. Now for regular things like hats or anything of the sort. Everybody's name is on the catalog item unless faculty puts it up, so in order to retrieve something, make sure you add it as a lost item because it matches name. If faculty adds it, then it is all about checking the catalog every so often. " },
        { question: "What if I have further questions or need assistance?", answer: "If you have any additional questions, need assistance, or encounter any issues with the web app, please reach out to Manas Ramesh, manas.ramesh24@trinityschoolnyc.org. " }
    ];

    const [activeIndex, setActiveIndex] = React.useState(null);

    const handleIsClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    }

    useEffect(() => {

        if(props.theme !== 'dark')
        {
            document.body.style.background = `url(${image}) `;
        }
        else{
            document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`;
        }
        // document.body.style.backgroundSize = 'cover';
        return () => {
            document.body.style.background = null;
        };
    }, [props.theme]);

    return (
        <div>
            <section style={{color: `${props.theme === 'dark' ? '#f5f5f5' : '#333'}`, marginBottom: '150px'}}>
                <h2 className='title my-4'>FAQs</h2>

                <div style={{ backgroundColor: `${props.theme === 'dark' ? '#333' : 'whitesmoke'}`, paddingLeft: "20px", borderRadius: "20px", paddingRight: "20px", paddingBottom: "50px", marginBottom:"50px"}}>
                    {faq.map((item, index) => (
                        <div key={index} onClick={() => handleIsClick(index)} className={`faq ${activeIndex === index ? 'active' : ''}`}>
                            <div className="question">
                                <h3>{item.question}</h3>

                                <svg width="15" height="10" viewBox="0 0 42 25">
                                    <path
                                        d="M3 3L21 21L39  3"
                                        stroke='white'
                                        stroke-width="7"
                                        stroke-linecap="round"
                                    />
                                </svg>
                            </div>
                            <div className="answer">
                                <p>{item.answer}</p>
                            </div>
                        </div>

                    ))}

                </div>
            </section>
        </div>
    )
}

export default Faq
