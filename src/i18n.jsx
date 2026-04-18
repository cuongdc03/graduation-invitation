import React, { createContext, useContext, useMemo } from 'react';

const translations = {
  en: {
    announcesGraduation: 'Announces the Graduation of',
    classOf: 'Class of',
    when: 'When',
    where: 'Where',
    addToCalendar: '+ Add to Calendar',
    viewMap: 'View Map',
    sendMessageRsvp: 'Send a Message / RSVP',
    sendMessage: 'Send a Message',
    modalSubtitle: "Let the graduate know you're coming or send a wish!",
    yourName: 'Your Name',
    namePlaceholder: 'Enter your name',
    messageLabel: 'Message',
    messagePlaceholder: 'Write your wishes here...',
    sending: 'Sending...',
    sendButton: 'Send Message',
    messageSent: 'Message Sent!',
    thankYou: 'Thank you for your response.',
    calendarTitle: 'Graduation Ceremony',
    calendarDetails: (name, university) =>
      `Join us to celebrate the graduation of ${name} from ${university}.`,
    switchLang: 'Tiếng Việt',
    attendingQuestion: 'Will you be attending?',
    yesAttending: 'Yes, I will be there',
    noAttending: 'No, I cannot make it',
  },
  vi: {
    announcesGraduation: 'Trân trọng thông báo Lễ Tốt Nghiệp của',
    classOf: 'Khóa',
    when: 'Thời gian',
    where: 'Địa điểm',
    addToCalendar: '+ Thêm vào Lịch',
    viewMap: 'Xem Bản đồ',
    sendMessageRsvp: 'Gửi Lời Chúc / Xác nhận tham dự',
    sendMessage: 'Gửi Lời Chúc',
    modalSubtitle: 'Hãy gửi lời chúc hoặc xác nhận tham dự nhé!',
    yourName: 'Họ và Tên',
    namePlaceholder: 'Nhập họ tên của bạn',
    messageLabel: 'Lời nhắn',
    messagePlaceholder: 'Viết lời chúc của bạn...',
    sending: 'Đang gửi...',
    sendButton: 'Gửi Lời Chúc',
    messageSent: 'Đã gửi thành công!',
    thankYou: 'Cảm ơn bạn đã phản hồi.',
    calendarTitle: 'Lễ Tốt Nghiệp',
    calendarDetails: (name, university) =>
      `Kính mời bạn đến chung vui lễ tốt nghiệp của ${name} tại ${university}.`,
    switchLang: 'English',
    attendingQuestion: 'Bạn sẽ tham dự chứ?',
    yesAttending: 'Có, tôi sẽ đến',
    noAttending: 'Rất tiếc, tôi không thể đến',
  },
};

const LanguageContext = createContext('en');

export function LanguageProvider({ lang, children }) {
  return (
    <LanguageContext.Provider value={lang}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const lang = useContext(LanguageContext);
  return useMemo(() => translations[lang] || translations.en, [lang]);
}

export function useLang() {
  return useContext(LanguageContext);
}

export function getLangFromHash() {
  const hash = window.location.hash.replace('#', '').replace('/', '');
  return hash === 'vi' ? 'vi' : 'en';
}
