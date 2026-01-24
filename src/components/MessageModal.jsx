import React, { useState } from 'react';
import { sendMessage } from '../services/notificationService';
import './MessageModal.css';

const MessageModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: '', text: '' });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await sendMessage(formData);
            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setFormData({ name: '', text: '' });
            }, 2000);
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose} type="button">×</button>

                {status === 'success' ? (
                    <div className="success-message">
                        <div className="check-icon">✓</div>
                        <h3>Message Sent!</h3>
                        <p>Thank you for your response.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <h2>Send a Message</h2>
                        <p>Let the graduate know you're coming or send a wish!</p>

                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="text">Message</label>
                            <textarea
                                id="text"
                                required
                                value={formData.text}
                                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                placeholder="Write your wishes here..."
                                rows="4"
                            />
                        </div>

                        <button
                            type="submit"
                            className="send-button"
                            disabled={status === 'sending'}
                        >
                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default MessageModal;
