// TermsOfService.jsx

import React from 'react';
import '../assets/termsofservice.css';

const TermsOfService = () => {
    return (
        <div className="terms-of-service-container">
            <h2>Terms of Service</h2>
            <hr /> {/* Horizontal line */}
            <p>
                Welcome to Daily Blogs Terms of Service page. This page informs you of the terms and conditions that govern your use of our website.
            </p>
            <h3>1. Acceptance of Terms</h3>
            <p>
                By accessing or using our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations.
            </p>
            <h3>2. Intellectual Property Rights</h3>
            <p>
                The content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Daily Blogs and is protected by copyright laws.
            </p>
            <h3>3. User Conduct</h3>
            <p>
                You agree not to use our website for any unlawful purpose or to engage in any activity that violates these Terms of Service.
            </p>
            <h3>4. Disclaimer</h3>
            <p>
                The information provided on this website is for general informational purposes only and is subject to change without notice.
            </p>
            <h3>5. Limitation of Liability</h3>
            <p>
                Daily Blogs shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of this website.
            </p>
            <p>
                If you have any questions about these Terms of Service, please contact us at: contact@dailyblogs.com
            </p>
        </div>
    );
};

export default TermsOfService;
