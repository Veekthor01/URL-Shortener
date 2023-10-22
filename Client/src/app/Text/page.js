import React from 'react';

export default function UrlPage() {
    return (
        <div className="w-4/5 mx-auto flex flex-col justify-center items-center mt-6">
            <h1 className='text-xl md:text-2xl text-center font-bold text-gray-700'>Fast and Easy URL Shortener!</h1>
            <p className='text-base text-gray-700'>You can shorten long URL links with Shortly and share with your friends, 
                business associates and on social media platforms, blogs, chats, emails...
                Just paste the long URL link in the box and click the "Shorten URL" button
                and it generates your short URL immediately so you can copy and share it everywhere.
                <br />
                You can also customize the shortened URL link by adding your own custom brand.
                </p>
        </div>
    );
};
