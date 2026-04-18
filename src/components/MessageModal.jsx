import React, { useState } from 'react';
import { sendMessage } from '../services/notificationService';
import { useTranslation } from '../i18n';
import './MessageModal.css';

const MessageModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ name: '', text: '', attending: true });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const t = useTranslation();

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
                setFormData({ name: '', text: '', attending: true });
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
                        <h3>{t.messageSent}</h3>
                        <p>{t.thankYou}</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <h2>{t.sendMessage}</h2>
                        <p>{t.modalSubtitle}</p>

                        <div className="form-group">
                            <label>{t.attendingQuestion}</label>
                            <div className="attendance-toggle">
                                <button
                                    type="button"
                                    className={`toggle-btn ${formData.attending === true ? 'active' : ''}`}
                                    onClick={() => setFormData({ ...formData, attending: true })}
                                >
                                    {t.yesAttending}
                                </button>
                                <button
                                    type="button"
                                    className={`toggle-btn ${formData.attending === false ? 'active' : ''}`}
                                    onClick={() => setFormData({ ...formData, attending: false })}
                                >
                                    {t.noAttending}
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">{t.yourName}</label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder={t.namePlaceholder}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="text">{t.messageLabel}</label>
                            <textarea
                                id="text"
                                required
                                value={formData.text}
                                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                placeholder={t.messagePlaceholder}
                                rows="4"
                            />
                        </div>

                        <button
                            type="submit"
                            className="send-button"
                            disabled={status === 'sending'}
                        >
                            {status === 'sending' ? t.sending : t.sendButton}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default MessageModal;
