
export type Translation = Record<string, string>;

export type Translations = {
  en: Translation;
  ms: Translation;
};

export const translations: Translations = {
  en: {
    // Header
    header_title: "ESG Student Guide",
    header_subtitle: "Your guide to making a difference.",
    learning_progress: "Learning Progress",
    points: "points",
    complete: "Complete",

    // Achievements
    ach_first_steps_title: "Journey Starter",
    ach_first_steps_desc: "You began your ESG adventure!",
    ach_branch_complete_title: "Curious Mind",
    ach_branch_complete_desc: "You explored your first topic!",
    ach_all_topics_title: "ESG Explorer",
    ach_all_topics_desc: "You explored all main topics!",
    ach_quiz_master_title: "Quiz Whiz",
    ach_quiz_master_desc: "Aced the quiz!",
    ach_streak_3_title: "On Fire!",
    ach_streak_3_desc: "3 correct answers in a row!",

    // Decision Tree Nodes
    start_text:
      "Hi! I'm your friendly guide to ESG. To make this a bit more personal, what should I call you?",
    greeting_text:
      "Awesome to meet you, **{userName}**! Let's get started. To begin, let's find out what ESG is.",
    what_is_esg_answer_text:
      "ESG = **Environmental, Social & Governance.**\n\nIt’s a framework for how we care for the planet 🌍, people 🤝, and systems 🏛️.\n\n- **Environmental**: Clean energy, less waste\n- **Social**: Fairness, diversity, respect\n- **Governance**: Ethics, transparency, good leadership\n\nESG matters because what you do – what you buy, how you learn, how you treat others – helps shape the future.",
    main_loop_text: "What else about ESG can I know?",
    main_loop_revisit_text: "Great! What's next, {userName}?",
    why_important_answer_text:
      "**ESG Is All Around You**\n\n- Clean air = Breathe better\n- Inclusive schools = Fair chances for all\n- Strong governance = Your data stays safe\n\nIt’s not just about climate – It’s about fairness, safety, and YOUR future ✨.",
    more_importance_esg_text:
      "Let's explore that. What are you curious about?",
    more_importance_esg_revisit_text: "Anything else on this topic?",
    matter_as_student_answer_text:
      "**The Big Picture: The Future You're Building**\n\n- **E** = Clear skies, clean water, stable climate 🌡️ (No more dorm floods!)\n- **S** = Fair chances for everyone – on campus & at work 💼\n- **G** = Apps & companies that respect your privacy 🔒\n\nThis is the world you're shaping – one choice at a time. 🎯",
    insurance_link_answer_text:
      "Think of ESG as the world's long-term insurance policy—built by all our actions. While ESG builds a better future, Personal insurance protects you today—like your laptop from theft or your health during exams. \n\nOne protects tomorrow's world, the other protects your now. 🛡️",
    what_can_i_do_answer_text:
      "**ESG in Everyday Life**\n\n**Environmental (E)**\n- 5-Minute Rule: Leaving for >5 mins? Turn off lights & unplug 🔌\n- Choose Tap: Bring a reusable bottle = less plastic + $ saved 💧\n\n**Social (S)**\n- Amplify Others: Share a friend's project or local biz post 👍\n- Be Welcoming: Say \"hey\" to someone sitting alone 👋\n\n**Governance (G)**\n- Cite Sources: Integrity = owning your work ✍️\n- Speak Up: See something wrong? Report it. That's leadership.",
    what_else_student_prompt_text:
      "Give me an example of another small ESG-friendly action you could take on campus.",
    how_relevant_answer_text:
      "**ESG: Not Just for Companies - It's for YOU**\n\n**Your Career**\n- Same degree, different edge: One knows about climate risks (E), diversity (S), & ethical data (G). The other doesn't.\n- ESG = You look smarter, more ready for today's world.\n\n**Your Life**\n- Clean parks. Fair systems. Less division.\n- ESG = A better world for the next 60+ years.\n- Care now = Winning later\n- ESG = An Investment in Future You 🚀",
    career_opportunities_answer_text:
      "**ESG Skills = Your Career Superpower!** 🦸\n\n**Hot New Jobs** 🔥\n- Sustainability Consultant\n- ESG Data Analyst\n- Climate Risk Specialist\n- Diversity & Inclusion Manager\n\n**Boost Any Job** ✨\n- Accountant? Audit carbon footprints.\n- Marketer? Spot greenwashing & promote real impact.\n- Actuary? Model climate & social risks.",
    career_next_steps_text: "How would you like to proceed?",
    how_to_learn_answer_text:
      "**Start Your ESG Journey NOW:**\n- Take a free ESG course online (so many out there!) 💻\n- Join a campus sustainability club 🌱\n- Follow ESG leaders & topics on LinkedIn 🔗",
    degree_major_prompt_text:
      "I can help with that. What is your degree major?",
    do_i_matter_answer_text:
      "**You Matter. More Than You Think.**\n\nEvery big change starts with one person doing something different.\n\n- You bring a reusable cup → Friend copies you → Cafe offers discounts → Thousands of cups saved! ☕\n- You skip sharing fake news → Group chat gets smarter → You fight misinformation! 🧠\n\nYour choices don't just add up - they inspire others. You're more powerful than you realize.",
    digital_habits_answer_text:
      "**Your Digital Life = BIG ESG Impact** 💻\n\n- **E**: The internet isn't magic! Every search, stream, & click uses tons of energy. \n  *Tip: Stream in SD, not HD, to save power!* 💡\n- **S**: Who you 'like' & share shapes online communities. \n  *Share responsibly & report hate – build a better digital world!* ❤️\n- **G**: Creepy targeted ads? That's data governance. \n  *Protect your data: strong passwords & think before you share!* 🔐\n\nYour digital citizenship = ESG in action.",
    learning_complete_prompt_quiz_text:
      "Thanks for chatting about ESG with us!! Hoping you learnt something new, {userName}. To lock in your knowledge, fancy a quick quiz?\n\n**Just a heads up:** You'll need to complete the quiz to claim your certificate!",
    
    // Quiz
    quiz_q1_text_dd: "Question 1: Match the concepts to the correct ESG pillar.",
    dd_item_E: "Clean energy, reduced waste, and resource conservation.",
    dd_item_S: "Fair labor practices, community relations, and diversity.",
    dd_item_G: "Ethical leadership, transparency, and shareholder rights.",
    
    quiz_q1_correct_text: "Correct! You've matched them all perfectly.",
    quiz_q2_text:
      "Question 2: Which of the following are NOT ESG related careers?",
    quiz_q2_correct_text:
      "You got it! While important, a food critic isn't a core ESG role.",
    quiz_q3_text:
      "Question 3: Which of these digital habits can reduce the environmental impact?",
    quiz_q3_correct_text:
      "Exactly! Streaming in SD instead of HD uses significantly less data and energy.",
    quiz_q4_text:
      "Question 4: According to the 'ESG in Everyday Life' section, which of these is an example of a 'Governance (G)' action?",
    quiz_q4_correct_text:
      "Perfect! Citing sources is an act of academic integrity, which is a core Governance principle.",
    quiz_q5_text:
      "Question 5: In the 'Does what I do really matter?' section, what is the 'ripple effect' of bringing a reusable coffee cup?",
    quiz_q5_correct_text:
      "That's the one! Your action inspires a wider chain of events.",
    quiz_q6_prompt_text:
      "Question 6 (Open-Ended): How much do you matter in saving our Earth?",
    quiz_q7_prompt_text:
      "Question 7 (Open-Ended): What is one action you will take to improve your ESG impact?",
    quiz_incorrect_text: "Not quite. Let's try the next one.",
    quiz_end_text:
      "Quiz complete! You got **{quizCorrectAnswers} out of 5** scorable questions correct. Your final score is **{score} out of 1000 points**!",
    final_thanks_no_quiz_text:
      "No problem, {userName}! Your final score is **{score} out of 1000 points**. Thanks for learning with me today. Keep making a positive impact! ✨",
    certificate_claim_info_text:
      "I've opened the certificate claim form for you in a new tab! Congratulations again.\n\nThanks for learning about ESG with me.\n\n🌍 **Fun ESG Fact:** By using this chatbot, you've emitted approximately **203g of CO₂** - that's equal to:\n* 🌡️ 30 minutes of air conditioner usage\n* 🚗 2km of distance covered by car\n\nEven digital learning has an environmental impact! Feel free to start over if you'd like to review the topics again.",
    
    // Buttons
    btn_what_is_esg: "What is ESG?",
    btn_what_else_esg: "Got it! What's next?",
    btn_why_important: "Why is ESG important?",
    btn_what_can_i_do: "What can I do about ESG as a student?",
    btn_how_relevant: "How is this relevant to my future?",
    btn_do_i_matter: "Does what I do really matter?",
    btn_more_on_importance: "More on the importance of ESG",
    btn_matter_as_student: "Why does it matter to me as a student?",
    btn_insurance_link: "What does this have to do with insurance?",
    btn_makes_sense: "That makes sense!",
    btn_interesting_perspective: "Interesting perspective!",
    btn_what_else_you_can_do: "What else can I do?",
    btn_understood: "Understood!",
    btn_career_opportunities: "What about career opportunities?",
    btn_tell_me_more: "Interesting! Tell me more.",
    btn_how_to_learn: "How do I learn such skills?",
    btn_what_is_your_major: "What can I do regarding ESG in my major?",
    btn_check_out: "Great, I'll check those out.",
    btn_very_cool: "Very cool!",
    btn_digital_habits: "How do my digital habits impact ESG?",
    btn_empowering: "That's empowering!",
    btn_take_quiz: "Let's have a short quiz!!",
    btn_no_quiz: "No thanks, I'm good.",
    btn_esg_stand_for_1: "Environmental, Social, Governance",
    btn_esg_stand_for_2: "Energy, Sustainability, Growth",
    btn_esg_stand_for_3: "Economics, Society, Globalization",
    btn_next_question: "Next Question!",
    btn_not_esg_career_1: "Food Critic",
    btn_not_esg_career_2: "Diversity & Inclusion Manager",
    btn_not_esg_career_3: "Climate Risk Specialist",
    btn_digital_habit_1: "Streaming videos in Standard Definition (SD)",
    btn_digital_habit_2: "Leaving your computer on 24/7",
    btn_digital_habit_3: "Always using cloud storage for all files",
    btn_governance_action_1: "Bringing a reusable water bottle",
    btn_governance_action_2: "Citing sources properly in your work",
    btn_governance_action_3:
      "Sharing a local business's post on social media",
    btn_ripple_effect_1: "It saves you a little money",
    btn_ripple_effect_2:
      "It inspires friends to do the same and encourages cafes to offer discounts",
    btn_ripple_effect_3: "It is a purely symbolic gesture with no real impact",
    btn_see_results: "See my results!",
    btn_continue: "Continue",
    btn_claim_certificate: "Claim Your Certificate",
    btn_share_score: "Share My Score",
    btn_start_over: "Start Over",
    btn_check_answer: "Check Answer",
  },
  ms: {
    // Header
    header_title: "Panduan Pelajar ESG",
    header_subtitle: "Panduan anda untuk membawa perubahan.",
    learning_progress: "Proses Pembelajaran",
    points: "mata",
    complete: "Selesai",

    // Achievements
    ach_first_steps_title: "Permulaan Perjalanan",
    ach_first_steps_desc: "Anda telah memulakan pengembaraan ESG anda!",
    ach_branch_complete_title: "Minda Ingin Tahu",
    ach_branch_complete_desc: "Anda telah meneroka topik pertama anda!",
    ach_all_topics_title: "Peneroka ESG",
    ach_all_topics_desc: "Anda telah meneroka semua topik utama!",
    ach_quiz_master_title: "Pakar Kuiz",
    ach_quiz_master_desc: "Berjaya menjawab kuiz!",
    ach_streak_3_title: "Hebat!",
    ach_streak_3_desc: "3 jawapan betul berturut-turut!",

    // Decision Tree Nodes
    start_text:
      "Hai! Saya panduan mesra anda untuk ESG. Untuk menjadikannya lebih peribadi, apakah nama panggilan anda?",
    greeting_text:
      "Gembira bertemu dengan anda, **{userName}**! Mari kita mulakan. Untuk bermula, mari kita ketahui apa itu ESG.",
    what_is_esg_answer_text:
      "ESG = **Alam Sekitar, Sosial & Tadbir Urus.**\n\nIa adalah rangka kerja tentang cara kita menjaga planet 🌍, manusia 🤝, dan sistem 🏛️.\n\n- **Alam Sekitar**: Tenaga bersih, kurangkan sisa\n- **Sosial**: Keadilan, kepelbagaian, hormat-menghormati\n- **Tadbir Urus**: Etika, ketelusan, kepimpinan yang baik\n\nESG penting kerana apa yang anda lakukan – apa yang anda beli, cara anda belajar, cara anda melayan orang lain – membantu membentuk masa depan.",
    main_loop_text: "Apa lagi yang boleh saya tahu tentang ESG?",
    main_loop_revisit_text: "Bagus! Apa seterusnya, {userName}?",
    why_important_answer_text:
      "**ESG Ada Di Sekeliling Anda**\n\n- Udara bersih = Bernafas lebih baik\n- Sekolah inklusif = Peluang saksama untuk semua\n- Tadbir urus yang kukuh = Data anda selamat\n\nIa bukan hanya tentang iklim – Ia tentang keadilan, keselamatan, dan masa depan ANDA ✨.",
    more_importance_esg_text:
      "Mari kita terokai itu. Apa yang anda ingin tahu?",
    more_importance_esg_revisit_text: "Ada lagi mengenai topik ini?",
    matter_as_student_answer_text:
      "**Gambaran Besar: Masa Depan Yang Anda Bina**\n\n- **E** = Langit cerah, air bersih, iklim yang stabil 🌡️ (Tiada lagi banjir di asrama!)\n- **S** = Peluang saksama untuk semua orang – di kampus & di tempat kerja 💼\n- **G** = Aplikasi & syarikat yang menghormati privasi anda 🔒\n\nInilah dunia yang anda sedang bentuk – satu pilihan pada satu masa. 🎯",
    insurance_link_answer_text:
      "Fikirkan ESG sebagai polisi insurans jangka panjang dunia—dibina oleh semua tindakan kita. Walaupun ESG membina masa depan yang lebih baik, insurans Peribadi melindungi anda hari ini—seperti komputer riba anda daripada kecurian atau kesihatan anda semasa peperiksaan. \n\nSatu melindungi dunia masa depan, yang lain melindungi dunia anda sekarang. 🛡️",
    what_can_i_do_answer_text:
      "**ESG dalam Kehidupan Seharian**\n\n**Alam Sekitar (E)**\n- Peraturan 5 Minit: Keluar >5 minit? Padamkan lampu & cabut plag 🔌\n- Pilih Air Paip: Bawa botol boleh guna semula = kurang plastik + jimat wang 💧\n\n**Sosial (S)**\n- Sokong Orang Lain: Kongsi projek rakan atau siaran perniagaan tempatan 👍\n- Bersikap Mesra: Sapa \"hai\" kepada seseorang yang duduk bersendirian 👋\n\n**Tadbir Urus (G)**\n- Petik Sumber: Integriti = hargai hasil kerja anda ✍️\n- Bersuara: Nampak sesuatu yang salah? Laporkan. Itulah kepimpinan.",
    what_else_student_prompt_text:
      "Beri saya satu contoh tindakan kecil mesra ESG lain yang boleh anda ambil di kampus.",
    how_relevant_answer_text:
      "**ESG: Bukan Hanya Untuk Syarikat - Ia Untuk ANDA**\n\n**Kerjaya Anda**\n- Ijazah yang sama, kelebihan berbeza: Seorang tahu tentang risiko iklim (E), kepelbagaian (S), & data beretika (G). Yang seorang lagi tidak.\n- ESG = Anda kelihatan lebih bijak, lebih bersedia untuk dunia hari ini.\n\n**Kehidupan Anda**\n- Taman yang bersih. Sistem yang adil. Kurang perpecahan.\n- ESG = Dunia yang lebih baik untuk 60+ tahun akan datang.\n- Peduli sekarang = Menang kemudian\n- ESG = Pelaburan untuk Masa Depan Anda 🚀",
    career_opportunities_answer_text:
      "**Kemahiran ESG = Kuasa Hebat Kerjaya Anda!** 🦸\n\n**Pekerjaan Baru Popular** 🔥\n- Perunding Kelestarian\n- Penganalisis Data ESG\n- Pakar Risiko Iklim\n- Pengurus Kepelbagaian & Keterangkuman\n\n**Tingkatkan Sebarang Pekerjaan** ✨\n- Akauntan? Audit jejak karbon.\n- Pemasar? Kenal pasti 'greenwashing' & promosikan impak sebenar.\n- Aktuari? Model risiko iklim & sosial.",
    career_next_steps_text: "Bagaimana anda ingin meneruskan?",
    how_to_learn_answer_text:
      "**Mulakan Perjalanan ESG Anda SEKARANG:**\n- Ambil kursus ESG percuma dalam talian (banyak yang ada!) 💻\n- Sertai kelab kelestarian di kampus 🌱\n- Ikuti pemimpin & topik ESG di LinkedIn 🔗",
    degree_major_prompt_text:
      "Saya boleh bantu dengan itu. Apakah bidang ijazah anda?",
    do_i_matter_answer_text:
      "**Anda Penting. Lebih Daripada Yang Anda Sangka.**\n\nSetiap perubahan besar bermula dengan seorang yang melakukan sesuatu yang berbeza.\n\n- Anda membawa cawan boleh guna semula → Rakan meniru anda → Kafe menawarkan diskaun → Ribuan cawan diselamatkan! ☕\n- Anda tidak berkongsi berita palsu → Perbualan kumpulan menjadi lebih bijak → Anda menentang maklumat salah! 🧠\n\nPilihan anda bukan sahaja memberi kesan – ia memberi inspirasi kepada orang lain. Anda lebih berkuasa daripada yang anda sedari.",
    digital_habits_answer_text:
      "**Kehidupan Digital Anda = Impak BESAR ESG** 💻\n\n- **E**: Internet bukan sihir! Setiap carian, penstriman, & klik menggunakan banyak tenaga. \n  *Petua: Strim dalam SD, bukan HD, untuk jimat kuasa!* 💡\n- **S**: Siapa yang anda 'suka' & kongsi membentuk komuniti dalam talian. \n  *Kongsi dengan bertanggungjawab & laporkan kebencian – bina dunia digital yang lebih baik!* ❤️\n- **G**: Iklan sasaran yang menyeramkan? Itu tadbir urus data. \n  *Lindungi data anda: kata laluan yang kuat & fikir sebelum berkongsi!* 🔐\n\nKewarganegaraan digital anda = ESG dalam tindakan.",
    learning_complete_prompt_quiz_text:
      "Terima kasih kerana berbual tentang ESG dengan kami!! Harap anda belajar sesuatu yang baru, {userName}. Untuk menguji pengetahuan anda, mahu cuba kuiz ringkas?\n\n**Perhatian:** Anda perlu melengkapkan kuiz untuk menuntut sijil anda!",
    
    // Quiz
    quiz_q1_text_dd: "Soalan 1: Padankan konsep kepada tonggak ESG yang betul.",
    dd_item_E: "Tenaga bersih, pengurangan sisa, dan pemuliharaan sumber.",
    dd_item_S: "Amalan buruh yang adil, hubungan komuniti, dan kepelbagaian.",
    dd_item_G: "Kepimpinan beretika, ketelusan, dan hak pemegang saham.",

    quiz_q1_correct_text: "Betul! Anda telah memadankan kesemuanya dengan sempurna.",
    quiz_q2_text:
      "Soalan 2: Antara berikut, yang manakah BUKAN kerjaya berkaitan ESG?",
    quiz_q2_correct_text:
      "Tepat sekali! Walaupun penting, pengkritik makanan bukanlah peranan teras ESG.",
    quiz_q3_text:
      "Soalan 3: Antara tabiat digital berikut, yang manakah dapat mengurangkan kesan alam sekitar?",
    quiz_q3_correct_text:
      "Betul! Menstrim dalam SD berbanding HD menggunakan data dan tenaga yang jauh lebih sedikit.",
    quiz_q4_text:
      "Soalan 4: Berdasarkan bahagian 'ESG dalam Kehidupan Seharian', yang manakah contoh tindakan 'Tadbir Urus (G)'?",
    quiz_q4_correct_text:
      "Sempurna! Memetik sumber adalah satu tindakan integriti akademik, yang merupakan prinsip teras Tadbir Urus.",
    quiz_q5_text:
      "Soalan 5: Dalam bahagian 'Adakah tindakan saya penting?', apakah 'kesan riak' daripada membawa cawan kopi boleh guna semula?",
    quiz_q5_correct_text:
      "Itu yang betul! Tindakan anda memberi inspirasi kepada rantaian peristiwa yang lebih luas.",
    quiz_q6_prompt_text:
      "Soalan 6 (Terbuka): Sejauh manakah anda penting dalam menyelamatkan Bumi kita?",
    quiz_q7_prompt_text:
      "Soalan 7 (Terbuka): Apakah satu tindakan yang akan anda ambil untuk meningkatkan impak ESG anda?",
    quiz_incorrect_text: "Tidak tepat. Mari cuba soalan seterusnya.",
    quiz_end_text:
      "Kuiz selesai! Anda mendapat **{quizCorrectAnswers} daripada 5** soalan boleh skor dengan betul. Skor akhir anda ialah **{score} daripada 1000 mata**!",
    final_thanks_no_quiz_text:
      "Tidak mengapa, {userName}! Skor akhir anda ialah **{score} daripada 1000 mata**. Terima kasih kerana belajar bersama saya hari ini. Teruskan memberi impak positif! ✨",
    certificate_claim_info_text:
      "Saya telah membuka borang tuntutan sijil untuk anda di tab baru! Tahniah sekali lagi.\n\nTerima kasih kerana belajar tentang ESG dengan saya.\n\n🌍 **Fakta ESG Menarik:** Dengan menggunakan chatbot ini, anda telah mengeluarkan kira-kira **203g CO₂** - itu bersamaan dengan:\n* 🌡️ 30 minit penggunaan penghawa dingin\n* 🚗 2km jarak yang dilalui oleh kereta\n\nPembelajaran digital juga mempunyai kesan alam sekitar! Jangan ragu untuk mulakan semula jika anda ingin mengkaji semula topik-topik tersebut.",
    
    // Buttons
    btn_what_is_esg: "Apakah itu ESG?",
    btn_what_else_esg: "Faham! Apa seterusnya?",
    btn_why_important: "Mengapa ESG penting?",
    btn_what_can_i_do: "Apa yang boleh saya lakukan sebagai pelajar?",
    btn_how_relevant: "Bagaimana ini relevan dengan masa depan saya?",
    btn_do_i_matter: "Adakah tindakan saya benar-benar penting?",
    btn_more_on_importance: "Lebih lanjut mengenai kepentingan ESG",
    btn_matter_as_student: "Mengapa ia penting bagi saya sebagai pelajar?",
    btn_insurance_link: "Apa kaitannya dengan insurans?",
    btn_makes_sense: "Itu munasabah!",
    btn_interesting_perspective: "Perspektif yang menarik!",
    btn_what_else_you_can_do: "Apa lagi yang boleh saya lakukan?",
    btn_understood: "Faham!",
    btn_career_opportunities: "Bagaimana dengan peluang kerjaya?",
    btn_tell_me_more: "Menarik! Beritahu saya lebih lanjut.",
    btn_how_to_learn: "Bagaimana saya boleh belajar kemahiran tersebut?",
    btn_what_is_your_major: "Apa yang boleh saya lakukan berkenaan ESG dalam bidang pengajian saya?",
    btn_check_out: "Baiklah, saya akan lihat.",
    btn_very_cool: "Sangat menarik!",
    btn_digital_habits: "Bagaimana tabiat digital saya mempengaruhi ESG?",
    btn_empowering: "Ia memberdayakan!",
    btn_take_quiz: "Jom cuba kuiz ringkas!!",
    btn_no_quiz: "Tidak, terima kasih.",
    btn_next_question: "Soalan Seterusnya!",
    btn_not_esg_career_1: "Pengkritik Makanan",
    btn_not_esg_career_2: "Pengurus Kepelbagaian & Keterangkuman",
    btn_not_esg_career_3: "Pakar Risiko Iklim",
    btn_digital_habit_1: "Menstrim video dalam Definisi Standard (SD)",
    btn_digital_habit_2: "Membiarkan komputer anda hidup 24/7",
    btn_digital_habit_3: "Sentiasa menggunakan storan awan untuk semua fail",
    btn_governance_action_1: "Membawa botol air boleh guna semula",
    btn_governance_action_2: "Memetik sumber dengan betul dalam kerja anda",
    btn_governance_action_3: "Berkongsi siaran perniagaan tempatan di media sosial",
    btn_ripple_effect_1: "Ia menjimatkan sedikit wang anda",
    btn_ripple_effect_2:
      "Ia memberi inspirasi kepada rakan-rakan untuk melakukan perkara yang sama dan menggalakkan kafe untuk menawarkan diskaun",
    btn_ripple_effect_3:
      "Ia hanyalah satu isyarat simbolik tanpa impak sebenar",
    btn_see_results: "Lihat keputusan saya!",
    btn_continue: "Teruskan",
    btn_claim_certificate: "Tuntut Sijil Anda",
    btn_share_score: "Kongsi Skor Saya",
    btn_start_over: "Mula Semula",
    btn_check_answer: "Semak Jawapan",
  },
};
