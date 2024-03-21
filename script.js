

        const API_KEY = "AIzaSyDBRFT7wu_xXLmyrWNzAjVWWpu4WycYyHU";
        const genAI = new GoogleGenerativeAI(API_KEY);

        async function generateResponse() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const userInquiry = document.getElementById('body').value ;
    if (!userInquiry) {
        alert('Please input your inquiry.');
        return;
    }

    const responseContainer = document.getElementById('email-container');
    responseContainer.innerHTML = 'Generating response...';
    
    const chat = model.startChat({
        history :[
        {
            role: "user",
            parts: "Hello.Are amenities such as high-speed WiFi, breakfast buffet, and swimming pools included in the service?How many types of rooms are available, and what are they?What payment methods are accepted at the hotel?Are there any pet policies guests should be aware of?Does the hotel offer special services or accommodations for guests with disabilities?What is the hotel's cancellation policy?Can guests request a late checkout, and if so, what are the conditions?Is smoking allowed within the hotel premises, and if so, are there any specific areas designated for smoking?Can guests request an extra bed, and if so, how can they do so?Are there dining options or services available for guests staying at the hotel?What is the hotel's location?What are the hotel's opening hours?When is the hotel's check-in time?When is the hotel's check-out time?Does the hotel offer airport shuttle service?Is there parking available at the hotel?Are there any nearby attractions or points of interest?Does the hotel offer laundry service?Are there any meeting or event spaces available for rental?Does the hotel offer room service?Is there a fitness center or gym on-site?Are there any special offers or packages available for guests?",
        },

        {
            role: "model",
            parts:"You are assistant model of our peninsula hotel.You are responsible for replying user text in formal email format.If user ask you something that is not related with our hotel please say 'I am not trained for this'.not related question is like asking for essay, code and others not our hotel stuffs. Only reply in formal email format.Followings are some answers you can reply if user ask questions related to them.Yes, high-speed WiFi, breakfast buffet, and swimming pools are included in the service.There are three room types: Standard, Deluxe, and Superior rooms.You can pay via mobile banking, credit, and debit cards.You can bring up to three pets with medical certificates provided to the hotel staff.Yes, there are 24/7 services for guests with disabilities and physical issues.The cancellation policy requires cancellation within 24 hours of booking, with a $50 fine for late cancellations.Yes, you can request a late checkout with a notice of at least 2 hours prior to the checkout time.Smoking is allowed in designated smoking areas and balconies, with a $100 fine for setting off smoke detectors.You can request an extra bed by calling the room service phone number - 12234.You can order dinner before 11 PM by calling 12235. The hotel is located at 24th Serena Street, Crimson City, Rhona State, 12008.The hotel operates 24/7. Check-in time starts at 2:00 PM local time.Check-out time is at 11:00 AM local time.Yes, the hotel provides airport shuttle service; please contact the front desk for arrangements.Yes, complimentary parking is available for guests.There are several nearby attractions, including museums, parks, and shopping centers. Staff can provide recommendations and assistance with directions.Yes, the hotel offers laundry and dry-cleaning services; inquire at the front desk for details and pricing.Yes, meeting rooms and event spaces are available for rent; contact the events team for inquiries and reservations. Yes, room service is available with a variety of menu options for breakfast, lunch, and dinner.Yes, there is a fully-equipped fitness center available for guests.Yes, the hotel frequently offers special deals and packages for guests; check the website or contact the front desk for current promotions.Do not answer the questions unrelated to our hotel.If the question from the user does not relate to the Peninsula Hotel ,please give this answer(I am not trained for this)",
        },
    
       
       
    
    ],

    
        generationConfig: {
        maxOutputTokens: 1000,
        },
    });

   
    const result = await chat.sendMessage(userInquiry);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    

 
    
    responseContainer.innerHTML = `
        <div class="email">
            <strong>Response:</strong><br>
            <strong>User :</strong> ${userInquiry}<br>
            <strong>Chat:</strong> ${text}<br>
        </div>
    `;

    const sender = document.getElementById('sender').value;
    const subject = document.getElementById('subject').value || "Automated Response";
    const body = text;
    await sendEmail(sender, subject, body);

}



       document.getElementById('send-button').addEventListener('click', generateResponse);