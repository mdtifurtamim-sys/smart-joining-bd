smart-joining-bd/
├── data/                                 # 🗄️ সার্ভার ডাটাবেজ স্টোরেজ (JSON Files)
│   ├── users.json                        # সকল ইউজারের একাউন্ট তথ্য ও ব্যালেন্স
│   ├── transactions.json                 # কেন্দ্রীয় লেজার ও সমস্ত লেনদেনের হিস্ট্রি
│   ├── voucherRequests.json              # রেগুলার ভাউচার ক্রয়ের হিস্ট্রি ও স্ট্যাটাস
│   ├── voucherSettings.json              # ভাউচার পার্সোনাল নম্বর ও কনফিগারেশন
│   ├── rechargeTransactions.json         # মোবাইল রিচার্জ ও ড্রাইভ প্যাকের হিস্ট্রি
│   ├── verificationRequests.json         # একাউন্ট ভেরিফিকেশন জমা ও তথ্য
│   ├── verificationSettings.json         # ভেরিফিকেশন ফি ও সেটিংস
│   ├── supportTickets.json               # লাইভ চ্যাট ও সাপোর্ট টিকেট মেসেজ
│   ├── notices.json                      # নোটিফিকেশন সেন্টার ডাটাবেজ
│   ├── bannerSettings.json               # ব্যানার স্লাইডার কনফিগারেশন
│   ├── websiteContent.json               # ওয়েবসাইট লিংক ও সোশ্যাল পোর্টাল
│   ├── gmailSubmissions.json             # জিমেইল সাবমিশন হিস্ট্রি
│   ├── gmailSellConfig.json              # জিমেইল কাজের রেট ও নির্দেশনাবলী
│   ├── shopOrders.json                   # অনলাইন শপের অর্ডার ও ডেলিভারি স্ট্যাটাস
│   ├── projectConfigs.json               # ২০টি প্রজেক্টের লাইভ ON/OFF সুইচ ও রেট
│   ├── generationEarnings.json           # ১৫-জেনারেশন টিম রেফারেল কমিশন
│   └── backups/                          # স্বয়ংক্রিয় ব্যাকআপ ফোল্ডার
│
├── public/                               # 🌐 ক্লায়েন্ট স্ট্যাটিক অ্যাসেটস
│   ├── assets/                           # স্ক্রিনশট, ব্যানার ও গ্রাফিক্স
│   ├── banners/                          # প্রমোশনাল স্লাইডার ব্যানার ছবি
│   ├── uploads/                          # 📁 ইউজারদের আপলোড করা পেমেন্ট স্ক্রিনশট ও ছবি
│   ├── logo.png / new-logo.png           # অফিসিয়াল এইচডি ব্র্যান্ড লোগো
│   └── manifest.json                     # PWA (Mobile App Install) কনফিগারেশন
│
├── src/                                  # 💻 ফ্রন্টএন্ড সোর্স কোড (React 19 + TypeScript + Tailwind v4)
│   ├── components/                       # ইউজার ইন্টারফেস কম্পোনেন্টস
│   │   ├── admin/                        # 🛡️ অ্যাডমিন প্যানেল
│   │   │   ├── AdminPanel.tsx            # ২০টি প্রজেক্ট কন্ট্রোল, ইউজার ও ফাইন্যান্স ম্যানেজমেন্ট
│   │   │   ├── ProjectDetailAdmin.tsx    # প্রজেক্ট নির্দিষ্ট কন্ট্রোল ও অন/অফ সুইচ
│   │   │   ├── GmailSellAdmin.tsx        # জিমেইল ভেরিফিকেশন ও এক ক্লিকে অনুমোদন
│   │   │   ├── RichTextEditor.tsx        # নোটিশ ও গাইডের জন্য রিচ টেক্সট এডিটর
│   │   │   └── ProjectDesignPreview.tsx  # রিয়েল-টাইম ইউজার ইন্টারফেস ডিজাইন প্রিভিউ
│   │   │
│   │   ├── Header.tsx                    # টপ হেডার (ব্যালেন্স, নোটিফিকেশন আইকন ও কাউন্ট)
│   │   ├── BottomNav.tsx                 # মোবাইল অ্যাপ স্টাইল বটম নেভিগেশন বার
│   │   ├── SidebarDrawer.tsx             # সাইডবার ড্রয়ার মেনু
│   │   ├── BannerSlider.tsx              # হোমপেজ ডায়নামিক ব্যানার স্লাইডার
│   │   ├── ProjectGrid.tsx               # ২০টি প্রজেক্টের গ্রিড (স্বয়ংক্রিয় অন/অফ চেক)
│   │   ├── UpcomingAlertModal.tsx        # 🕒 অফ প্রজেক্টের জন্য 'Upcoming / শীঘ্রই আসছে' অ্যালার্ট
│   │   ├── NotificationCenterView.tsx    # 🔔 গোল্ডেন হেডারের নোটিফিকেশন সেন্টার
│   │   ├── SafeHtmlRenderer.tsx          # 🛡️ সুরক্ষিত HTML পার্সার (DOMPurify চালিত)
│   │   ├── VoucherPointsView.tsx         # 💳 রেগুলার ভাউচার পয়েন্ট ক্রয়, হিস্ট্রি ও উত্তোলন
│   │   ├── MobileRechargeView.tsx        # 📱 ইনস্ট্যান্ট রিচার্জ ও ড্রাইভ অফার প্যাক
│   │   ├── GmailSellView.tsx             # 📧 জিমেইল বিক্রয় ও জমা দেওয়া
│   │   ├── OnlineShopView.tsx            # 🛍️ অনলাইন শপ ও প্রোডাক্ট ক্যাটালগ
│   │   ├── WalletView.tsx                # 💰 ইনকাম ওয়ালেট, উইথড্র ও অ্যাকাউন্ট হিস্ট্রি
│   │   ├── VerificationCard.tsx          # আনভেরিফাইড কার্ড ও ভেরিফাই নির্দেশনাবলী
│   │   ├── VerificationModal.tsx         # ভেরিফিকেশন পেমেন্ট গেটওয়ে পপআপ
│   │   ├── UnverifiedProjectGateModal.tsx# গেটকিপার গার্ড মোডাল
│   │   ├── SupportModal.tsx              # লাইভ সাপোর্ট চ্যাট ও টিকেট সিস্টেম
│   │   ├── CoursesView.tsx               # স্কিল কোর্স ও ভিডিও টিউটোরিয়াল
│   │   ├── NetworkView.tsx               # ১৫ জেনারেশন রেফারেল নেটওয়ার্ক ট্রি
│   │   ├── ProfileView.tsx               # প্রোফাইল আপডেট ও পাসওয়ার্ড পরিবর্তন
│   │   ├── LoginPage.tsx                 # ইউজার লগইন পেজ
│   │   ├── RegisterPage.tsx              # নতুন একাউন্ট খোলার পেজ
│   │   ├── NoticeModal.tsx               # অফিশিয়াল ওয়েলকাম নোটিশ পপআপ
│   │   └── Toast.tsx                     # ইনস্ট্যান্ট ফিডব্যাক নোটিফিকেশন
│   │
│   ├── types.ts                          # সম্পূর্ণ অ্যাপ্লিকেশনের টাইপস্ক্রিপ্ট টাইপ ডেফিনিশন
│   ├── App.tsx                           # মূল রুট, নেভিগেশন ও স্টেট কন্ট্রোলার
│   ├── main.tsx                          # React 19 এন্ট্রি পয়েন্ট
│   └── index.css                         # Tailwind CSS v4 গ্লোবাল থিম
│
├── server.ts                             # 🖥️ ব্যাকএন্ড সার্ভার (Express API + ফাইল আপলোড + স্ট্যাটিক ফাইল হোস্টিং)
├── package.json                          # প্যাকেজ তালিকা ও রান স্ক্রিপ্ট
├── vite.config.ts                        # Vite বিল্ড কনফিগারেশন
├── Dockerfile                            # ডকার ডেপ্লয়মেন্ট ফাইল (প্রোডাকশন রেডি)
├── docker-compose.yml                    # সিঙ্গেল কমান্ড রান ফাইল
├── README.md                             # বিস্তারিত ডকুমেন্টেশন
└── index.html                            # মূল HTML পেজ
