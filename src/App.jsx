import { useState, useEffect } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://alypejwrpoaokosckvsu.supabase.co";
const SUPABASE_KEY = "sb_publishable_7dYcglMcIrWCoBFkafFVdA_frAk4PcC";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ── UNSPLASH IMAGE IDs ────────────────────────────────────────────────────────
const IMG = {
  hero:    "https://images.unsplash.com/photo-1483884105135-c06ea81a7a80?w=1600&q=80&auto=format&fit=crop",
  strip1:  "https://images.unsplash.com/photo-1495837174058-628aafc7d610?w=800&q=80&auto=format&fit=crop",
  strip2:  "https://images.unsplash.com/photo-1514489024785-d5ba8dfb2198?w=800&q=80&auto=format&fit=crop",
  strip3:  "https://images.unsplash.com/photo-1533810019453-7351dbd31aee?w=800&q=80&auto=format&fit=crop",
};

// ── PALETTE ───────────────────────────────────────────────────────────────────
const C = {
  navy:"#23354e", slate:"#4e5e70",
  pink:"#f2b6c1", pinkD:"#d4829a",
  teal:"#3fa7a0", tealD:"#2a7a75",
  black:"#111111", white:"#ffffff",
  g50:"#f9f9f9", g100:"#f2f2f2",
  g200:"#e4e4e4", g400:"#999999", g600:"#555555",
};

const PLACEHOLDER_PROS = [
  { name:"Rebecca Flores, Esq.", specialty:"Family Law Attorney", city:"Denver", firm:"Flores Family Law", bio:"15 years focused on divorce, custody, and post-decree modifications. Known for clear communication and honest timelines. Free 30-min consult for Next Step Colorado members.", recommendations:["She got me through the hardest year of my life. Honest and fair. — Jamie T.","Worth every penny. She explained everything clearly. — Renee M."] },
  { name:"Diane Park, CDFA®", specialty:"Financial Planner · CDFA", city:"Denver", firm:"Summit Financial Planning", bio:"Certified Divorce Financial Analyst specializing in asset division, QDRO analysis, and post-divorce budgeting. Helps you understand what the settlement really means long-term.", recommendations:["I had no idea what a QDRO was. Diane walked me through everything. — Carla S."] },
  { name:"Cara Simmons", specialty:"Divorce Coach", city:"Remote / CO", firm:"Cara Simmons Coaching", bio:"CDC-certified divorce coach and co-parenting strategist. Helps you get clear, stay sane, and make decisions that serve your future self — not your worst day.", recommendations:["Cara helped me stop reacting and start thinking. Game changer. — Melissa K."] },
  { name:"Jennifer Walsh, Esq.", specialty:"Family Law Attorney", city:"Colorado Springs", firm:"Walsh Family Law", bio:null, recommendations:["Jennifer fought hard for me and my kids. Best attorney in the Springs. — Amanda R.","She's honest about what things will cost. No surprises. — Tanya B.","Got full custody. I can't recommend her enough. — Nicole F."] },
  { name:"Dr. Patricia Osei", specialty:"Therapist / Counselor", city:"Aurora", firm:"Osei Counseling & Therapy", bio:null, recommendations:["Dr. Osei helped me process the grief of my marriage ending. Changed my life. — Simone L.","She specializes in divorce trauma. Worth every session. — Keisha M."] },
];

const ALL_RESOURCES = [
  { name:"211 Colorado", categories:["Legal Help","Housing & Rent","Food Assistance","Rural & All - Colorado","Utilities & Financial","Child & Youth","Mental Health","Sexual Assault","Domestic Violence","Other"], phone:"211", web:"211colorado.org", area:"Statewide", desc:"Colorado's free, confidential helpline connecting residents to health and human services statewide — food, shelter, utilities, childcare, legal help and more. Available 24/7 by phone, text or online search by ZIP code. Works everywhere in Colorado including rural areas.", emergency:true },
  { name:"A Precious Child: Empowering Kids to Succeed", categories:["Child & Youth"], address:"7051 W. 118th Ave", city:"Broomfield", phone:"303-466-4272", email:"contactus@apreciouschild.org", web:"apreciouschild.org", area:"Adams, Arapahoe, Broomfield, Boulder, Denver, Douglas, Jefferson, Weld", desc:"Providing children in need with opportunities and resources to empower them to achieve their full potential." },
  { name:"Alight Alliance to Lead Impact in Global Human Trafficking", categories:["Legal Help"], address:"1312 17th St. Suite 732", city:"Denver", phone:"720-314-8445", web:"alightnet.org", area:"Statewide", desc:"Connects children, women and men who have suffered human trafficking to free legal help at a critical point in their recovery." },
  { name:"Animal Assisted Therapy Programs", categories:["Mental Health"], address:"7275 Kipling St", city:"Arvada", phone:"720-266-4444", email:"info@aatpc.org", web:"animalassistedtherapyprograms.org", area:"Denver Metro / Jefferson County", desc:"Counseling service integrating professional therapists with therapy animals to support trauma recovery, anxiety, depression and life transitions." },
  { name:"Aurora Housing Authority", categories:["Housing & Rent"], address:"2280 S. Xanadu Way", city:"Aurora", phone:"720-251-2100", email:"info@aurorahousing.org", web:"aurorahousing.org", area:"Aurora", desc:"Provides affordable housing options and rental assistance vouchers for income-qualified Aurora residents, including families in transition." },
  { name:"Benefits in Action", categories:["Food Assistance","Other"], address:"12157 W. Cedar Dr", city:"Lakewood", phone:"720-221-8354", altPhone:"888-496-4252", email:"info@benefitsinaction.org", web:"benefitsinaction.org", area:"Denver Metro / Jefferson County", desc:"Dedicated to helping individuals and families access public benefits and community resources. Expert assistance with Medicaid, Medicare, SNAP and Social Security Disability Insurance." },
  { name:"Beyond Home", categories:["Housing & Rent","Utilities & Financial","Mental Health"], phone:"303-420-6634", email:"info@beyondhome.org", web:"beyondhome.org", area:"Jefferson County", desc:"Empowers families to overcome barriers to stability through housing support, utility assistance, mental health services, and community resources." },
  { name:"Boys Town National Hotline", categories:["Emergency & Crisis","Mental Health","Child & Youth"], phone:"800-448-3000", web:"boystown.org", area:"National / Statewide", desc:"Free, confidential crisis support for kids, teens and parents available 24/7 by phone, text or chat. Trained counselors and mental health experts available around the clock.", emergency:true },
  { name:"CARE Center", categories:["Housing & Rent","Utilities & Financial"], address:"1600 N. Downing St", city:"Denver", phone:"303-838-1200", web:"carecenter.us", area:"Statewide", desc:"Trauma-informed call center providing intake support for Colorado rent, utility and housing assistance programs. Reach a live agent by phone, chat or text in English, Spanish or 100+ languages." },
  { name:"Catholic Charities", categories:["Housing & Rent","Child & Youth","Utilities & Financial","Food Assistance","Other"], address:"6240 Smith Road", city:"Denver", phone:"855-777-5280", email:"info@ccdenver.org", web:"ccdenver.org", area:"Denver Metro / Statewide", desc:"Offers shelter, affordable housing, early childhood education, counseling, emergency services, rent and utilities, employment, food and clothing, case management, family and senior services." },
  { name:"Champa House", categories:["Housing & Rent"], address:"2544 Champa St", city:"Denver", phone:"303-294-9961", web:"providencenetwork.org", area:"Denver Metro", desc:"Those struggling with addiction, domestic violence and homelessness need more than a roof. Provides transformational housing, professional counseling, and 24/7 live-in staff support." },
  { name:"College Hunks Hauling Junk & Moving", categories:["Other"], web:"collegehunkshaulingjunk.com/safemoves-strongvoices", area:"Statewide", desc:"Offers free or discounted moving services for domestic violence survivors through their Safe Moves Strong Voices program. Contact them directly to discuss your situation and eligibility." },
  { name:"Colorado Address Confidentiality Program", categories:["Domestic Violence"], address:"1001 E 62nd Ave", city:"Denver", phone:"303-866-2208", email:"acp@state.co.us", web:"colorado.gov/acp", area:"Statewide", desc:"Provides survivors of stalking, sexual assault and domestic violence with a legal substitute address and mail forwarding." },
  { name:"Colorado Child Care Assistance Program (CCCAP)", categories:["Child & Youth","Utilities & Financial"], web:"coloradoofficeofearlychildhood.com", area:"Statewide", desc:"Helps families that are homeless, working, searching for work or in school find low-income child care assistance." },
  { name:"Colorado Child Support Services", categories:["Legal Help","Utilities & Financial"], phone:"800-374-6558", web:"childsupport.state.co.us", area:"Statewide", desc:"Establishes paternity, sets and enforces child support orders, and helps collect payments. Free statewide service." },
  { name:"Colorado Child Support Guideline Calculator", categories:["Legal Help","Utilities & Financial"], web:"cobar.org/child-support", area:"Statewide", desc:"Free online tool to estimate child support amounts before going to court. Helpful for understanding what to expect before hiring an attorney." },
  { name:"Colorado Coalition for the Homeless", categories:["Housing & Rent","Other","Rural & All - Colorado"], address:"2111 Champa St", city:"Denver", phone:"303-293-2217", email:"info@coloradocoalition.org", web:"coloradocoalition.org", area:"Denver Metro", desc:"Works collaboratively toward the prevention of homelessness and lasting solutions for families, children, and individuals experiencing or at risk of homelessness." },
  { name:"Colorado Housing Connects", categories:["Housing & Rent"], address:"2250 Eaton St", city:"Denver", phone:"844-926-6632", web:"coloradohousingconnects.org", area:"Statewide", desc:"Colorado's statewide resource for eviction and foreclosure prevention — connects residents to emergency rental assistance, housing counseling, and legal help by county. Call before your court date." },
  { name:"Colorado Legal Services", categories:["Legal Help"], address:"1905 Sherman St, Suite 400", city:"Denver", phone:"303-837-1313", web:"coloradolegalservices.org", area:"Statewide", desc:"Free legal services to eligible low-income Coloradans. Offices in Denver, Colorado Springs, Fort Collins, Greeley, Grand Junction, Boulder and Alamosa." },
  { name:"Colorado Mental Health Line", categories:["Emergency & Crisis","Mental Health"], phone:"988", web:"988colorado.com", area:"Statewide", desc:"Colorado's free 24/7 mental health crisis line. Call or text 988 for immediate support for emotional, mental health or substance use concerns.", emergency:true },
  { name:"Colorado Organization for Victim Assistance", categories:["Utilities & Financial","Domestic Violence","Legal Help"], address:"1325 S. Colorado Blvd", city:"Denver", phone:"303-861-1160", web:"covahelps.org", area:"Statewide", desc:"Helps individuals impacted by crime through direct services, financial support and connections to other providers. Also administers the Colorado Victim Compensation Program." },
  { name:"Colorado PEAK", categories:["Utilities & Financial","Food Assistance","Other","Child & Youth"], web:"coloradopeak.com", area:"Statewide", desc:"Colorado's online portal to apply for and manage state benefits including Medicaid, SNAP food assistance, CHIP, cash assistance and childcare subsidies — all in one application." },
  { name:"Colorado State Child Abuse & Neglect Hotline", categories:["Child & Youth","Emergency & Crisis","Rural & All - Colorado"], phone:"844-264-5437", web:"cdhs.colorado.gov", area:"Statewide", desc:"Colorado's 24/7 statewide hotline to report suspected child abuse or neglect. If a child is in immediate danger, call 911 first.", emergency:true },
  { name:"Comitis Crisis Center", categories:["Emergency & Crisis","Mental Health","Housing & Rent"], address:"2178 Victor St", city:"Aurora", phone:"303-341-9160", web:"comitiscrisiscenter.org", area:"Aurora / East Metro", desc:"Emergency and transitional shelter for families with children, single adults, and female veterans. Offers meals, hygiene items, case management and financial literacy classes.", emergency:true },
  { name:"Community Economic Defense Project (CEDP)", categories:["Legal Help","Utilities & Financial"], address:"1600 N. Downing St, Suite 600", city:"Denver", email:"info@cedproject.org", web:"cedproject.org", area:"Denver Metro", desc:"Provides rental assistance, legal assistance and representation, and resource navigation for clients facing eviction, housing insecurity and other types of economic hardship." },
  { name:"Connect for Health Colorado", categories:["Utilities & Financial","Healthcare"], phone:"855-752-6749", web:"connectforhealthco.com", area:"Statewide", desc:"Colorado's official health insurance marketplace. Critical for women who lose health insurance through a spouse's plan after divorce — you may qualify for subsidies based on income." },
  { name:"Crime Victim Services Directory", categories:["Legal Help","Other","Rural & All - Colorado"], web:"cova.civicore.com/directory", area:"Statewide", desc:"Online directory of crime victim service providers throughout Colorado. Search by county or service type to find local victim advocates, counselors, and legal resources." },
  { name:"Deaf Overcoming Violence Through Empowerment (DOVE)", categories:["Emergency & Crisis","Domestic Violence"], phone:"303-831-7874", web:"deafdove.org", area:"Statewide", desc:"DOVE works with Deaf, DeafBlind, DeafDisabled and Hard of Hearing people of all ages who have experienced abuse, offering advocacy, safety planning and connections to accessible services." },
  { name:"Decatur Place Apartments", categories:["Housing & Rent"], address:"1155 Decatur St", city:"Denver", phone:"303-893-2718", web:"mercyhousing.org", area:"Denver", desc:"106-unit affordable housing community for low-income families, managed by Mercy Housing." },
  { name:"Denver Bar Association Metro Volunteer Lawyers", categories:["Legal Help"], address:"1905 Sherman St", city:"Denver", phone:"303-830-8210", email:"mvl@denbar.org", web:"denbar.org/mvl", area:"Denver Metro", desc:"Pro bono legal services by volunteer lawyers within the Denver Metro Area. Contact Colorado Legal Services first at 303-837-1313 — MVL accepts referrals through CLS." },
  { name:"Denver Children's Advocacy Center", categories:["Child & Youth"], address:"2149 Federal Blvd", city:"Denver", phone:"303-825-3850", email:"info@denvercac.org", web:"denvercac.org", area:"Denver Metro", desc:"Child advocacy center providing trauma-informed support for child abuse survivors — forensic interviews, mental health treatment, medical exams and family support services." },
  { name:"Denver Housing Authority", categories:["Housing & Rent"], address:"1401 Mariposa St", city:"Denver", phone:"720-932-3000", web:"denverhousing.org", area:"Denver", desc:"Portfolio of over 13,000 units and housing choice vouchers providing affordable housing to more than 26,000 low and middle income individuals. Waitlist likely — contact for current availability." },
  { name:"Denver Rescue Mission: The Crossing", categories:["Housing & Rent","Food Assistance","Other"], address:"6090 Smith Road", city:"Denver", phone:"303-953-3900", web:"denverrescuemission.org", area:"Denver Metro", desc:"Transitional and bridge housing for families with children. Provides meals, case management and support services for families experiencing homelessness." },
  { name:"Denver Temporary Rental & Utility Assistance (TRUA)", categories:["Utilities & Financial","Housing & Rent"], phone:"844-926-6632", email:"denvertrua@denvergov.org", web:"denvergov.org/renthelp", area:"City and County of Denver", desc:"City of Denver emergency rental and utility assistance. Households may apply if they have a current Demand for Rent or documentation showing an active eviction case." },
  { name:"Domestic Shelters", categories:["Domestic Violence","Rural & All - Colorado"], web:"domesticshelters.org/help/co", area:"National / Statewide", desc:"Searchable national directory of domestic violence shelters and services — filter by Colorado to find local options including rural areas." },
  { name:"Douglas County Housing Partnership", categories:["Housing & Rent"], address:"9350 Heritage Hills Cir", city:"Lone Tree", phone:"303-784-7824", email:"mciano@douglasco.gov", web:"douglascountyhousingpartnership.org", area:"Douglas County", desc:"Connects Douglas County residents to affordable housing options, rental assistance programs, and housing counseling services." },
  { name:"Douglas County Victim Assistance", categories:["Domestic Violence","Legal Help"], address:"4000 Justice Way", city:"Castle Rock", phone:"303-660-7535", web:"dcsheriff.net", area:"Douglas County", desc:"Free, confidential services available to all crime victims in Douglas County regardless of whether charges are filed." },
  { name:"Douglas County Wrap Around / Youth Initiative", categories:["Child & Youth"], address:"4400 Castleton Court", city:"Castle Rock", phone:"303-814-5327", email:"malston@douglasco.gov", web:"douglasco.gov", area:"Douglas County", desc:"Free and voluntary program that helps families solve complex challenges by building a strong support team around them." },
  { name:"Early Intervention Colorado", categories:["Child & Youth"], address:"710 South Ash St", city:"Denver", phone:"833-733-3734", email:"getstartedwithEI@state.co.us", web:"dcfs.my.salesforce-sites.com/eicolorado", area:"Statewide", desc:"Free evaluation and services for children birth to age 3 with developmental delays or disabilities. No referral needed." },
  { name:"Elbert County Victim Witness", categories:["Legal Help","Domestic Violence","Emergency & Crisis"], address:"215 Comanche St", city:"Kiowa", phone:"303-621-2027", altPhone:"303-621-2875", web:"elbertcounty-co.gov", area:"Elbert County", desc:"Crisis intervention, grief support, criminal justice advocacy and referrals for Elbert County crime victims. Available 24/7 through on-call advocates." },
  { name:"Energy Outreach Colorado / LEAP", categories:["Utilities & Financial"], phone:"303-825-8750", altPhone:"866-432-8435", email:"info@energyoutreach.org", web:"energyoutreach.org/find-agency", area:"Statewide", desc:"Helps income-qualified Coloradans afford home energy costs through bill pay assistance programs. Find your local assistance agency by county on their site." },
  { name:"Family HomeStead", categories:["Housing & Rent"], address:"PO Box 40186", city:"Denver", phone:"303-623-6514", web:"familyhomestead.org", area:"Denver Metro", desc:"Provides transitional housing and supportive services to help homeless families achieve stability. Case management, life skills training and community resource connections." },
  { name:"Family Resource Pavilion", categories:["Mental Health","Legal Help","Other"], address:"9700 E. Easter Ln", city:"Centennial", phone:"720-213-1400", web:"shilohhouse.org/facilities/family-resource-pavilion", area:"Arapahoe County / South Metro Denver", desc:"A one-stop hub for young people and families to find support for behavioral health, mental health, family conflict, substance use and court involvement." },
  { name:"Family Tree", categories:["Child & Youth","Domestic Violence","Housing & Rent"], address:"3805 Marshall Street", city:"Wheat Ridge", phone:"303-420-6752", altPhone:"303-467-2604", email:"info@thefamilytree.org", web:"thefamilytree.org", area:"Jefferson County", desc:"Partners with all people to prevent and overcome child abuse, domestic violence, and homelessness to promote safety, healing and stability across generations." },
  { name:"Foothills Animal Shelter — Better Together Program", categories:["Domestic Violence","Other"], address:"580 McIntyre St", city:"Golden", phone:"720-407-5244", email:"bettertogether@fas4pets.org", web:"foothillsanimalshelter.org/better-together", area:"Jefferson County / Denver Metro", desc:"Keeps pets safe so DV survivors can leave without leaving their animals behind. Recognizing that pets are often used as a means of control in abusive situations." },
  { name:"Foothills Regional Housing", categories:["Housing & Rent"], address:"11941 W 48th Ave", city:"Wheat Ridge", phone:"303-422-8600", email:"info@foothillsrh.org", web:"foothillsrh.org", area:"Jefferson County", desc:"Owns and manages 25 affordable housing communities across Jefferson County for low and moderate income individuals and families." },
  { name:"Help & Hope Center (Douglas / Elbert Task Force)", categories:["Housing & Rent","Domestic Violence","Food Assistance"], address:"1638 Park Street", city:"Castle Rock", phone:"303-688-1114", email:"info@helpandhopecenter.org", web:"helpandhopecenter.org", area:"Douglas / Elbert Counties", desc:"Dedicated to providing assistance to people in Douglas and Elbert Counties in serious economic need, at risk of homelessness or in a similar crisis." },
  { name:"Hunger Free Colorado", categories:["Food Assistance"], address:"1355 S. Colorado Blvd", city:"Denver", phone:"720-328-1284", altPhone:"855-855-4626", email:"info@hungerfreecolorado.org", web:"hungerfreecolorado.org", area:"Statewide", desc:"Connects people to food resources to meet existing needs and drives policy, systems and social change to end hunger." },
  { name:"Jefferson Center for Mental Health", categories:["Mental Health","Emergency & Crisis"], address:"4851 Independence St", city:"Wheat Ridge", phone:"303-425-0300", web:"jcmh.org", area:"Jefferson & Gilpin Counties", desc:"Community mental health center offering therapy, psychiatric services, substance use treatment and crisis intervention on a sliding scale. Walk-in crisis services available." },
  { name:"Joshua Station", categories:["Housing & Rent","Mental Health","Other"], address:"2330 W. Mulberry Pl", city:"Denver", phone:"720-377-1103", web:"milehighmin.org/joshua-station", area:"Denver Metro", desc:"Family-friendly transitional housing. Case management, life skills support, and connections to permanent housing." },
  { name:"Justice & Mercy Legal Aid Center", categories:["Legal Help"], address:"5400 Washington St", city:"Denver", phone:"303-839-1008", email:"jamlac@jamlac.org", web:"jamlac.org", area:"Adams, Arapahoe, Broomfield, Clear Creek, Denver, Douglas, Gilpin & Jefferson Counties", desc:"Free civil legal services including family law, immigration and DV cases. English and Spanish. Cannot assist with cases that have hearings within 4 weeks of intake." },
  { name:"Kempe Foundation", categories:["Child & Youth"], address:"13123 E. 16th Ave", city:"Aurora", phone:"303-864-5300", email:"info@kempe.org", web:"kempe.org", area:"Denver Metro", desc:"National leader in child abuse prevention, treatment and research. Clinical services, training and advocacy for children who have experienced abuse or neglect." },
  { name:"Latina Safehouse", categories:["Domestic Violence"], address:"PO Box 11174", city:"Denver", phone:"303-433-4470", web:"latinasafehouse.org", area:"Denver Metro", desc:"Provides bilingual and culturally sensitive services to Latina survivors of domestic violence and their families." },
  { name:"Maiker Housing Partners (Adams County Housing Authority)", categories:["Housing & Rent"], address:"3033 W. 71st Ave", city:"Westminster", phone:"303-227-2075", web:"maikerhp.org", area:"Adams County", desc:"Disrupting generational poverty through socially conscious community development in Adams County." },
  { name:"Mercy Housing", categories:["Housing & Rent"], address:"1600 Broadway", city:"Denver", phone:"303-830-3300", email:"customerservice@mercyhousing.org", web:"mercyhousing.org", area:"Statewide", desc:"Leading affordable housing organization working to eliminate homelessness and housing insecurity for families, seniors, individuals and people with disabilities." },
  { name:"Mile High Behavioral Healthcare", categories:["Mental Health","Healthcare","Housing & Rent"], address:"4242 Delaware St", city:"Denver", phone:"303-825-8113", web:"milehighbehavioralhealthcare.org", area:"Denver Metro", desc:"Continuum of behavioral healthcare including mental health treatment, substance use services, crisis intervention and affordable housing programs." },
  { name:"Moving to End Sexual Assault (MESA)", categories:["Sexual Assault","Emergency & Crisis"], address:"1455 Dixon Ave Suite 210", city:"Lafayette", phone:"303-443-7300", altPhone:"303-443-0400", email:"info@movingtoendsexualassault.org", web:"movingtoendsexualassault.org", area:"Boulder & Broomfield Counties", desc:"Boulder County's rape crisis center since 1972. 24/7 hotline, crisis advocacy, support groups and legal and medical support for survivors. Call or text BRAVE to 20121.", emergency:true },
  { name:"National Coalition Against Domestic Violence (NCADV)", categories:["Domestic Violence","Emergency & Crisis"], web:"ncadv.org", area:"National / Statewide", desc:"National DV advocacy organization with resources, safety planning tools, and state-by-state resource directories for survivors." },
  { name:"National Domestic Violence Hotline", categories:["Domestic Violence","Emergency & Crisis"], phone:"800-799-7233", web:"thehotline.org", area:"National / Statewide", desc:"Free, confidential 24/7 crisis support, safety planning and local shelter referrals for DV survivors. Call, text START to 88788 or chat online.", emergency:true },
  { name:"National Sexual Assault Hotline (RAINN)", categories:["Emergency & Crisis","Sexual Assault"], phone:"800-656-4673", web:"rainn.org", area:"National / Statewide", desc:"Free, confidential and trauma-informed support for survivors of sexual violence, available 24/7.", emergency:true },
  { name:"PeaceWorks, Inc.", categories:["Emergency & Crisis","Domestic Violence","Sexual Assault"], phone:"303-838-8181", altPhone:"303-838-7176", email:"info@peaceworksinc.co", web:"peaceworksinc.co", area:"Park, Jefferson & Clear Creek Counties", desc:"The only emergency DV shelter across 3,000+ square miles of mountain Jefferson, Park and Clear Creek counties. 24/7 crisis assistance for victims, their children and pets.", emergency:true },
  { name:"Porchlight: A Family Justice Center", categories:["Domestic Violence","Sexual Assault","Legal Help","Child & Youth","Mental Health"], address:"11100 W. 8th Avenue", city:"Lakewood", phone:"303-271-6100", altPhone:"303-271-6190", email:"porchlight@jeffco.us", web:"porchlightfjc.org", area:"Jefferson County", desc:"Family Justice Center providing comprehensive legal, emotional and supportive services for survivors of DV, sexual assault, child abuse, elder abuse and human trafficking." },
  { name:"Project Safeguard", categories:["Domestic Violence","Legal Help"], address:"7325 S. Potomac St", city:"Centennial", phone:"303-799-3977", web:"psghelps.org", area:"Statewide", desc:"Supports survivors of gender-based violence through non-attorney legal advocacy and attorney services to help clients understand their rights within the civil legal system." },
  { name:"Ralston House", categories:["Child & Youth"], address:"10795 W. 58th Ave", city:"Arvada", phone:"720-898-6741", email:"info@ralstonhouse.org", web:"ralstonhouse.org", area:"Jefferson, Adams, Gilpin & Broomfield Counties", desc:"Provides a safe place to investigate child abuse and ensure victim services for children who have been physically or sexually abused or witnessed violence." },
  { name:"Rocky Mountain Victim Law Center", categories:["Legal Help"], phone:"303-295-2001", email:"info@rmvictimlaw.org", web:"rmvictimlaw.org", area:"Statewide", desc:"Free legal representation to crime victims including DV survivors, sexual assault survivors and human trafficking victims." },
  { name:"SafeHouse Denver", categories:["Domestic Violence","Emergency & Crisis"], address:"1649 Downing St", city:"Denver", phone:"303-318-9989", web:"safehouse-denver.org", area:"Denver Metro", desc:"Serves survivors of domestic violence and their children through an emergency shelter, a non-residential counseling and advocacy center and an extended stay program.", emergency:true },
  { name:"Safehouse Progressive Alliance for Nonviolence (SPAN)", categories:["Domestic Violence"], address:"835 North Street", city:"Boulder", phone:"303-444-2424", altPhone:"303-449-8623", email:"info@safehousealliance.org", web:"safehousealliance.org", area:"Boulder & Broomfield Counties", desc:"24/7 crisis line, emergency shelter, counseling, legal advocacy and transitional services. Programs for LGBTQ survivors, Latinx survivors, immigrant survivors and older adults.", emergency:true },
  { name:"SARA House", categories:["Rural & All - Colorado","Sexual Assault","Domestic Violence"], phone:"970-867-2121", email:"admin@sarahouseco.org", web:"sarahouseco.org", area:"Morgan, Logan, Phillips, Sedgwick, Yuma, Washington & Kit Carson Counties", desc:"Dedicated to the empowerment of sexual assault and domestic violence victims through direct services and community education across eastern Colorado." },
  { name:"Servicios De La Raza", categories:["Food Assistance","Mental Health","Healthcare","Emergency & Crisis","Sexual Assault","Child & Youth"], address:"3131 W. 14th Ave", city:"Denver", phone:"303-458-5851", email:"info@serviciosdelaraza.org", web:"serviciosdelaraza.org", area:"Denver Metro", desc:"Empowers Denver's Latino/Hispanic community through culturally responsive services including mental health, sexual assault services, food assistance, immigration support and youth programs. Bilingual EN/ES." },
  { name:"Shiloh House", categories:["Child & Youth","Housing & Rent","Other"], address:"6588 W. Ottawa Ave", city:"Littleton", phone:"303-933-1393", altPhone:"303-932-9599", email:"info@shilohhouse.net", web:"shilohhouse.org", area:"Arapahoe, Jefferson & Denver Counties", desc:"Residential treatment, foster care, community-based mental health and transitional living programs for youth and families facing trauma, behavioral health needs, and housing instability." },
  { name:"Tennyson Center for Children", categories:["Child & Youth","Mental Health"], address:"2950 Tennyson St", city:"Denver", phone:"303-433-2541", email:"info@tennysoncenter.org", web:"tennysoncenter.org", area:"Denver Metro", desc:"Partners with kids and families impacted by neglect, abuse, and trauma to find personalized paths to healing." },
  { name:"TESSA", categories:["Domestic Violence","Sexual Assault","Emergency & Crisis"], address:"435 Gold Pass Heights", city:"Colorado Springs", phone:"719-633-3819", altPhone:"719-633-1462", web:"tessacs.org", area:"El Paso & Teller Counties", desc:"Offers a confidential SafeHouse, victim advocacy, counseling and children's programs, a 24/7 safe line and community outreach and education.", emergency:true },
  { name:"The Action Center", categories:["Food Assistance","Utilities & Financial","Other"], address:"8755 W. 14th Avenue", city:"Lakewood", phone:"720-215-4850", altPhone:"303-237-7704", email:"office@theactioncenter.org", web:"theactioncenter.org", area:"Jefferson County", desc:"Provides an immediate and compassionate response to those experiencing hardship, offering resources and services to stabilize lives and promote pathways to lasting change." },
  { name:"The Blue Bench (Formerly RAAP)", categories:["Sexual Assault","Emergency & Crisis","Mental Health"], phone:"303-322-7273", altPhone:"303-329-9922", email:"resourceline@thebluebench.org", web:"thebluebench.org", area:"Adams, Arapahoe, Douglas, Elbert, Gilpin, Denver, Broomfield & Lincoln Counties", desc:"Committed to eliminating sexual assault through comprehensive advocacy, prevention and survivor care. Crisis intervention, counseling, legal advocacy and a 24/7 resource line.", emergency:true },
  { name:"The Center for Trauma and Resilience", categories:["Mental Health","Legal Help","Other"], address:"PO Box 18975", city:"Denver", phone:"303-894-8000", altPhone:"303-860-0660", web:"traumahealth.org", area:"Denver Metro", desc:"Trauma-informed, culturally responsive mental health and legal advocacy services for crime victims including DV survivors, sexual assault survivors and human trafficking victims." },
  { name:"The Empowerment Program", categories:["Mental Health","Other","Healthcare"], address:"1600 York St", city:"Denver", phone:"303-320-1989", email:"info@empowermentprogram.org", web:"empowermentprogram.org", area:"Denver Metro", desc:"Licensed mental health and drug treatment providing trauma-informed and gender-responsive outpatient services for women who have experienced homelessness, criminal justice involvement or substance use challenges." },
  { name:"The Initiative: Abuse-Free Culture For All", categories:["Domestic Violence","Rural & All - Colorado"], address:"6825 E. Tennessee Ave", city:"Denver", altPhone:"303-839-5510", email:"info@theinitiativeco.org", web:"theinitiativecolorado.org", area:"Statewide", desc:"Fully remote victim advocacy organization. Not an emergency shelter — may take 2 business days to hear back." },
  { name:"The Rose Andom Center", categories:["Domestic Violence","Sexual Assault"], address:"1330 Fox Street", city:"Denver", phone:"720-337-4400", altPhone:"303-595-4330", email:"info@roseandomcenter.org", web:"roseandomcenter.org", area:"Denver Metro", desc:"Denver's family justice center for DV and sexual assault survivors — advocacy, legal help, counseling, safety planning, and connections to housing and financial resources under one roof." },
  { name:"Three Birds Alliance", categories:["Domestic Violence","Emergency & Crisis","Legal Help","Child & Youth","Housing & Rent"], address:"PO Box 914", city:"Aurora", phone:"303-343-1851", altPhone:"303-577-7927", web:"threebirdsalliance.org", area:"Aurora / Arapahoe County", desc:"The only 24/7 shelter in Aurora and Arapahoe County — emergency shelter, crisis line, counseling, court advocacy, and housing navigation. Formerly Gateway DV Services. Accepts pets.", emergency:true },
  { name:"Victim Outreach Incorporated", categories:["Domestic Violence","Sexual Assault"], phone:"303-202-2196", email:"voi@victimoutreach.org", web:"victimoutreach.org", area:"Jefferson County", desc:"Law enforcement-based victim advocacy serving seven Jefferson County jurisdictions — crisis intervention, emergency financial assistance, court support, and community referrals." },
  { name:"Violence Free Colorado", categories:["Domestic Violence","Rural & All - Colorado"], phone:"303-831-9632", altPhone:"888-778-7091", web:"violencefreecolorado.org", area:"All 64 Colorado Counties", desc:"Colorado's statewide DV coalition connecting survivors to local programs in all 64 counties. Not a direct service provider — use their website to find your county's local DV program, or call M-F 9am–5pm." },
  { name:"Warren Village", categories:["Housing & Rent"], address:"1323 Gilpin St", city:"Denver", phone:"303-321-2345", email:"info@warrenvillage.org", web:"warrenvillage.org", area:"Denver Metro", desc:"Transitional housing, quality childcare and support services exclusively for low-income single-parent families. Case management, financial coaching, and life skills programming." },
];

const CATEGORIES = ["All","Emergency & Crisis","Domestic Violence","Sexual Assault","Legal Help","Mental Health","Child & Youth","Food Assistance","Housing & Rent","Utilities & Financial","Rural & All - Colorado","Other"];
const PRO_SPECIALTIES = ["Family Law Attorney","Mediator","CDFA / Financial Planner","Divorce Coach","Paralegal Services","Therapist / Counselor","Other"];

export default function App() {
  const [tab, setTab] = useState("resources");
  const [activeCat, setActiveCat] = useState("All");
  const [rSearch, setRSearch] = useState("");
  const [expanded, setExpanded] = useState({});
  const [showEmail, setShowEmail] = useState(false);
  const [showSafety, setShowSafety] = useState(true);   // safety popup shows on load
  const [emailDone, setEmailDone] = useState(false);
  const [resDone, setResDone] = useState(false);
  const [email, setEmail] = useState("");
  const [endorsements, setEndorsements] = useState({});
  const [endorsed, setEndorsed] = useState({});
  const [loadingEndorsements, setLoadingEndorsements] = useState(true);

  useEffect(() => { fetchEndorsements(); }, []);

  const fetchEndorsements = async () => {
    try {
      const { data, error } = await supabase.from("professionals").select("name, endorsements");
      if (error) throw error;
      const map = {};
      data.forEach(row => { map[row.name] = row.endorsements || 0; });
      setEndorsements(map);
    } catch (err) {
      console.error("Could not fetch endorsements:", err);
    } finally {
      setLoadingEndorsements(false);
    }
  };

  const handleEndorse = async (proName) => {
    if (endorsed[proName]) return;
    setEndorsed(e => ({ ...e, [proName]: true }));
    setEndorsements(e => ({ ...e, [proName]: (e[proName] || 0) + 1 }));
    try {
      const { data: existing } = await supabase.from("professionals").select("name, endorsements").eq("name", proName).single();
      if (existing) {
        await supabase.from("professionals").update({ endorsements: (existing.endorsements || 0) + 1 }).eq("name", proName);
      } else {
        await supabase.from("professionals").insert({ name: proName, endorsements: 1 });
      }
    } catch (err) {
      console.error("Endorsement failed:", err);
      setEndorsed(e => ({ ...e, [proName]: false }));
      setEndorsements(e => ({ ...e, [proName]: Math.max(0, (e[proName] || 1) - 1) }));
    }
  };

  const toggleExpand = cat => setExpanded(e => ({ ...e, [cat]: !e[cat] }));

  const matchesSearch = r => {
    const q = rSearch.toLowerCase();
    return !q || r.name.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q) || (r.area||"").toLowerCase().includes(q) || r.categories.some(c => c.toLowerCase().includes(q));
  };
  const matchesCat = r => activeCat === "All" || r.categories.includes(activeCat);
  const filteredAll = ALL_RESOURCES.filter(r => matchesSearch(r) && matchesCat(r));

  const getSections = () => {
    if (activeCat !== "All") return [{ catName: activeCat, items: filteredAll }];
    return CATEGORIES.filter(c => c !== "All").map(catName => ({
      catName,
      items: filteredAll.filter(r =>
        r.categories[0] === catName ||
        (r.categories.includes(catName) && !CATEGORIES.slice(1, CATEGORIES.indexOf(catName)).some(prev => r.categories.includes(prev)))
      )
    })).filter(s => s.items.length > 0);
  };
  const sections = getSections();

  const inp = { width:"100%", padding:"11px 14px", border:`1px solid ${C.g200}`, borderRadius:8, fontFamily:"'DM Sans', system-ui, sans-serif", fontSize:14, background:C.white, color:C.black, outline:"none", boxSizing:"border-box" };
  const inpDark = { ...inp, background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.15)", color:C.white };
  const lbl = { display:"block", fontSize:11, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:C.g600, marginBottom:6, fontFamily:"'DM Sans', system-ui, sans-serif" };
  const lblD = { ...lbl, color:"rgba(255,255,255,.5)" };

  const SectionLabel = ({ text, dark }) => (
    <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", color: dark ? C.pink : C.teal, marginBottom:12, display:"flex", alignItems:"center", gap:10, fontFamily:"'DM Sans', system-ui, sans-serif" }}>
      <span style={{ display:"inline-block", width:24, height:1, background: dark ? C.pink : C.teal }} />
      {text}
    </div>
  );

  const Modal = ({ children, onClose }) => (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(17,17,17,.7)", zIndex:200, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background:C.white, borderRadius:"20px 20px 0 0", padding:"28px 20px 44px", width:"100%", maxWidth:580, maxHeight:"92vh", overflowY:"auto", boxShadow:"0 -8px 40px rgba(0,0,0,.2)" }}>
        {children}
      </div>
    </div>
  );

  const RCard = ({ r }) => (
    <div style={{ background: r.emergency ? "#fff8f9" : C.white, borderRadius:12, border:`1px solid ${r.emergency ? "#f5c6cc" : C.g200}`, padding:"18px 16px", display:"flex", flexDirection:"column", gap:10, boxShadow:"0 1px 3px rgba(0,0,0,.04)", transition:"box-shadow .2s, transform .15s" }}
      onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,.09)";e.currentTarget.style.transform="translateY(-2px)";}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 1px 3px rgba(0,0,0,.04)";e.currentTarget.style.transform="translateY(0)";}}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 }}>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:16, fontWeight:700, lineHeight:1.3, color:C.black, marginBottom:2 }}>{r.name}</div>
          {r.city && <div style={{ fontSize:11, color:C.g400, fontFamily:"'DM Sans', system-ui, sans-serif", marginTop:2 }}>📍 {r.city}{r.address ? ` · ${r.address}` : ""}</div>}
        </div>
        {r.emergency && <span style={{ fontSize:9, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", padding:"4px 10px", borderRadius:99, background:C.pink, color:C.black, flexShrink:0, fontFamily:"'DM Sans', system-ui, sans-serif" }}>24/7</span>}
      </div>
      <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
        {r.categories.map(cat => (
          <span key={cat} style={{ fontSize:10, fontWeight:600, padding:"3px 9px", borderRadius:99, background: cat==="Emergency & Crisis" ? "#fde8ec" : "#e8f4f3", color: cat==="Emergency & Crisis" ? C.pinkD : C.tealD, fontFamily:"'DM Sans', system-ui, sans-serif" }}>{cat}</span>
        ))}
      </div>
      <div style={{ fontSize:13, color:C.g600, lineHeight:1.7, fontFamily:"'DM Sans', system-ui, sans-serif" }}>{r.desc}</div>
      {r.area && <div style={{ fontSize:11, color:C.g400, fontFamily:"'DM Sans', system-ui, sans-serif" }}>Serves: {r.area}</div>}
      <div style={{ display:"flex", gap:7, flexWrap:"wrap", marginTop:2 }}>
        {r.phone && <a href={`tel:${r.phone.replace(/\D/g,"")}`} style={{ fontSize:12, fontWeight:600, padding:"7px 14px", borderRadius:99, background:C.teal, color:C.white, fontFamily:"'DM Sans', system-ui, sans-serif", textDecoration:"none" }} onMouseEnter={e=>e.target.style.background=C.tealD} onMouseLeave={e=>e.target.style.background=C.teal}>📞 {r.phone}</a>}
        {r.altPhone && <span style={{ fontSize:12, padding:"7px 14px", borderRadius:99, background:C.g100, color:C.g600, fontFamily:"'DM Sans', system-ui, sans-serif" }}>{r.altPhone}</span>}
        {r.web && <a href={`https://${r.web.replace(/^https?:\/\//,"")}`} target="_blank" rel="noreferrer" style={{ fontSize:12, fontWeight:600, padding:"7px 14px", borderRadius:99, background:"#fde8ec", color:C.pinkD, fontFamily:"'DM Sans', system-ui, sans-serif", textDecoration:"none" }} onMouseEnter={e=>e.target.style.background="#f9d0d8"} onMouseLeave={e=>e.target.style.background="#fde8ec"}>🌐 Website</a>}
      </div>
    </div>
  );

  const ProCard = ({ pro }) => {
    const count = endorsements[pro.name] || 0;
    const hasEndorsed = endorsed[pro.name];
    const isUnclaimed = !pro.bio;
    return (
      <div style={{ background:C.white, borderRadius:14, border:`1px solid ${C.g200}`, overflow:"hidden", boxShadow:"0 1px 4px rgba(0,0,0,.05)", transition:"box-shadow .2s, transform .15s" }}
        onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 12px 32px rgba(0,0,0,.1)";e.currentTarget.style.transform="translateY(-3px)";}}
        onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 1px 4px rgba(0,0,0,.05)";e.currentTarget.style.transform="translateY(0)";}}>
        <div style={{ height:4, background: isUnclaimed ? C.g200 : `linear-gradient(90deg, ${C.teal}, ${C.navy})` }} />
        <div style={{ padding:"20px 18px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
            <div style={{ flex:1, paddingRight:8 }}>
              <div style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:18, fontWeight:700, color:C.black, lineHeight:1.2, marginBottom:3 }}>{pro.name}</div>
              <div style={{ fontSize:12, color:C.g600, fontFamily:"'DM Sans', system-ui, sans-serif" }}>{pro.firm} · {pro.city}</div>
            </div>
            <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", padding:"3px 10px", borderRadius:99, background: isUnclaimed ? C.g100 : "#e8f4f3", color: isUnclaimed ? C.g400 : C.tealD, fontFamily:"'DM Sans', system-ui, sans-serif", flexShrink:0 }}>
              {isUnclaimed ? "Community Listed" : "Claimed ✓"}
            </span>
          </div>
          <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:C.teal, marginBottom:10, fontFamily:"'DM Sans', system-ui, sans-serif" }}>{pro.specialty}</div>
          {isUnclaimed && (
            <div style={{ background:C.g50, border:`1px dashed ${C.g200}`, borderRadius:8, padding:"12px 14px", marginBottom:12 }}>
              <div style={{ fontSize:13, color:C.g600, fontFamily:"'DM Sans', system-ui, sans-serif", lineHeight:1.6, marginBottom:8 }}>
                <strong style={{ color:C.black }}>This listing was created by community members.</strong> The professional hasn't claimed it yet — full bio and contact info will appear once they do.
              </div>
              <a href="mailto:thenextstepcolorado@gmail.com" style={{ fontSize:12, fontWeight:600, color:C.teal, fontFamily:"'DM Sans', system-ui, sans-serif", textDecoration:"none" }}>
                Are you {pro.name.split(" ")[0]} {pro.name.split(" ")[1]}? Claim this listing →
              </a>
            </div>
          )}
          {pro.bio && <div style={{ fontSize:13, color:C.g600, lineHeight:1.7, marginBottom:14, fontFamily:"'DM Sans', system-ui, sans-serif" }}>{pro.bio}</div>}
          {pro.recommendations && pro.recommendations.length > 0 && (
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:10, fontWeight:600, letterSpacing:"0.12em", textTransform:"uppercase", color:C.g400, marginBottom:8, fontFamily:"'DM Sans', system-ui, sans-serif" }}>Community Recommendations · {pro.recommendations.length}</div>
              {pro.recommendations.map((r, i) => (
                <div key={i} style={{ fontSize:13, color:C.g600, fontFamily:"'DM Sans', system-ui, sans-serif", lineHeight:1.6, fontStyle:"italic", marginBottom: i < pro.recommendations.length-1 ? 8 : 0, paddingLeft:12, borderLeft:`2px solid ${C.pink}` }}>"{r}"</div>
              ))}
            </div>
          )}
          <div style={{ paddingTop:14, borderTop:`1px solid ${C.g200}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <div style={{ fontSize:13, color:C.g600, fontFamily:"'DM Sans', system-ui, sans-serif" }}>
                👍 <strong style={{ color:C.black }}>{loadingEndorsements ? "—" : count}</strong> {count === 1 ? "endorsement" : "endorsements"}
              </div>
              <div style={{ fontSize:11, color:C.g400, marginTop:2, fontFamily:"'DM Sans', system-ui, sans-serif" }}>from community members</div>
            </div>
            <button onClick={() => handleEndorse(pro.name)} disabled={hasEndorsed} style={{ background: hasEndorsed ? C.g100 : C.teal, color: hasEndorsed ? C.g400 : C.white, border: hasEndorsed ? `1px solid ${C.g200}` : "none", padding:"8px 16px", borderRadius:99, fontSize:13, fontWeight:600, cursor: hasEndorsed ? "default" : "pointer", fontFamily:"'DM Sans', system-ui, sans-serif", transition:"background .15s" }}
              onMouseEnter={e=>{ if(!hasEndorsed) e.target.style.background=C.tealD; }}
              onMouseLeave={e=>{ if(!hasEndorsed) e.target.style.background=C.teal; }}>
              {hasEndorsed ? "✓ Endorsed" : "Endorse"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ fontFamily:"'DM Sans', system-ui, sans-serif", background:C.g50, color:C.black, minHeight:"100vh", maxWidth:"100vw", overflowX:"hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* ── SAFETY EXIT — bigger and more prominent ── */}
      <a href="https://google.com" style={{ position:"fixed", top:12, right:12, zIndex:999, background:C.black, color:C.white, fontFamily:"'DM Sans', system-ui, sans-serif", fontSize:13, fontWeight:700, padding:"10px 20px", borderRadius:99, textDecoration:"none", boxShadow:"0 4px 16px rgba(0,0,0,.35)", letterSpacing:"0.05em", display:"flex", alignItems:"center", gap:7, border:`2px solid ${C.pink}` }}>
        <span style={{ fontSize:15 }}>✕</span> Quick Exit
      </a>

      {/* ── SAFETY POPUP ── */}
      {showSafety && (
        <div style={{ position:"fixed", inset:0, background:"rgba(17,17,17,.75)", zIndex:500, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div style={{ background:C.white, borderRadius:20, padding:"36px 28px", maxWidth:480, width:"100%", boxShadow:"0 24px 64px rgba(0,0,0,.25)", position:"relative" }}>
            {/* pink top border */}
            <div style={{ position:"absolute", top:0, left:0, right:0, height:5, background:`linear-gradient(90deg, ${C.teal}, ${C.pink})`, borderRadius:"20px 20px 0 0" }} />

            <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", color:C.teal, marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ display:"inline-block", width:20, height:1, background:C.teal }} />
              Welcome to Next Step Colorado
            </div>

            <h2 style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:24, fontWeight:700, lineHeight:1.2, color:C.black, marginBottom:16 }}>
              Your safety and privacy matter.
            </h2>

            {/* quick exit highlight box */}
            <div style={{ background:"#fff8f9", border:`2px solid ${C.pink}`, borderRadius:12, padding:"16px 18px", marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                <div style={{ background:C.black, color:C.white, padding:"6px 12px", borderRadius:99, fontSize:12, fontWeight:700, whiteSpace:"nowrap", border:`2px solid ${C.pink}`, flexShrink:0 }}>✕ Quick Exit</div>
                <div style={{ fontSize:13, color:C.g600, lineHeight:1.65, fontFamily:"'DM Sans', system-ui, sans-serif" }}>
                  <strong style={{ color:C.black }}>See the button in the top right corner of every page?</strong> Click it anytime to instantly close this site and go to Google — no trace left behind.
                </div>
              </div>
            </div>

            <p style={{ fontSize:14, color:C.g600, lineHeight:1.75, marginBottom:8, fontFamily:"'DM Sans', system-ui, sans-serif" }}>
              If you're worried about someone seeing your browsing history, you can also open this site in your browser's <strong style={{ color:C.black }}>Incognito</strong> or <strong style={{ color:C.black }}>Private</strong> mode — it won't save your history at all.
            </p>

            <p style={{ fontSize:14, color:C.g600, lineHeight:1.75, marginBottom:24, fontFamily:"'DM Sans', system-ui, sans-serif", fontStyle:"italic" }}>
              You are not alone. This directory is here for you.
            </p>

            <button onClick={() => setShowSafety(false)} style={{ width:"100%", background:C.teal, color:C.white, border:"none", padding:"14px", borderRadius:99, fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans', system-ui, sans-serif", transition:"background .15s" }}
              onMouseEnter={e=>e.target.style.background=C.tealD} onMouseLeave={e=>e.target.style.background=C.teal}>
              I understand — Take me to the resources →
            </button>
          </div>
        </div>
      )}

      {/* ── NAV ── */}
      <nav style={{ background:C.black, padding:"0 clamp(16px,4vw,48px)", display:"flex", alignItems:"center", justifyContent:"space-between", height:60, position:"sticky", top:0, zIndex:100, borderBottom:"1px solid rgba(255,255,255,.06)" }}>
        <div style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:17, fontWeight:600, color:C.white, letterSpacing:"-0.01em" }}>
          Next Step <span style={{ color:C.pink }}>Colorado</span>
        </div>
        <div style={{ display:"flex", gap:20, alignItems:"center" }}>
          <button onClick={()=>setTab("resources")} style={{ background:"none", border:"none", fontSize:13, fontWeight:500, color: tab==="resources" ? C.white : "rgba(255,255,255,.5)", cursor:"pointer", fontFamily:"'DM Sans', system-ui, sans-serif", padding:0 }}>Resources</button>
          <button onClick={()=>setTab("pros")} style={{ background:"none", border:"none", fontSize:13, fontWeight:500, color: tab==="pros" ? C.white : "rgba(255,255,255,.5)", cursor:"pointer", fontFamily:"'DM Sans', system-ui, sans-serif", padding:0 }}>Professionals</button>
          <button onClick={()=>setShowEmail(true)} style={{ background:C.pink, color:C.black, border:"none", padding:"7px 16px", borderRadius:99, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans', system-ui, sans-serif" }} onMouseEnter={e=>e.target.style.background=C.pinkD} onMouseLeave={e=>e.target.style.background=C.pink}>Stay Updated</button>
        </div>
      </nav>

      {/* ── HERO with image background ── */}
      <div style={{ position:"relative", borderBottom:`4px solid ${C.pink}`, overflow:"hidden", minHeight:520, display:"flex", alignItems:"center" }}>
        {/* background image */}
        <div style={{ position:"absolute", inset:0, backgroundImage:`url(${IMG.hero})`, backgroundSize:"cover", backgroundPosition:"center 30%", filter:"brightness(0.35)" }} />
        {/* overlay gradient */}
        <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg, rgba(17,17,17,.85) 0%, rgba(35,53,78,.7) 100%)` }} />

        <div style={{ position:"relative", maxWidth:860, margin:"0 auto", padding:"clamp(52px,8vw,88px) clamp(16px,4vw,48px)" }}>
          <SectionLabel text="Colorado's Divorce Resource Directory" dark />
          <h1 style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:"clamp(40px,7vw,80px)", fontWeight:700, color:C.white, lineHeight:1.05, letterSpacing:"-0.03em", marginBottom:24, maxWidth:780 }}>
            Your next chapter<br /><em style={{ fontStyle:"italic", color:C.pink }}>starts here.</em>
          </h1>
          <p style={{ fontSize:17, color:"rgba(255,255,255,.65)", lineHeight:1.75, maxWidth:520, marginBottom:36 }}>
            A free resource directory for Colorado women navigating divorce — real help, real organizations, all across the state.
          </p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <button onClick={()=>setTab("resources")} style={{ background:C.teal, color:C.white, border:"none", padding:"14px 28px", borderRadius:99, fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans', system-ui, sans-serif", transition:"background .15s, transform .1s" }} onMouseEnter={e=>{e.currentTarget.style.background=C.tealD;e.currentTarget.style.transform="translateY(-1px)";}} onMouseLeave={e=>{e.currentTarget.style.background=C.teal;e.currentTarget.style.transform="translateY(0)";}}>Find Resources →</button>
            <button onClick={()=>setTab("pros")} style={{ background:"transparent", color:"rgba(255,255,255,.7)", border:"1px solid rgba(255,255,255,.25)", padding:"14px 28px", borderRadius:99, fontSize:14, fontWeight:500, cursor:"pointer", fontFamily:"'DM Sans', system-ui, sans-serif" }} onMouseEnter={e=>{e.currentTarget.style.color=C.white;e.currentTarget.style.borderColor="rgba(255,255,255,.5)";}} onMouseLeave={e=>{e.currentTarget.style.color="rgba(255,255,255,.7)";e.currentTarget.style.borderColor="rgba(255,255,255,.25)";}}>Find Professionals</button>
          </div>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div style={{ background:C.g50, borderBottom:`1px solid ${C.g200}` }}>
        <div style={{ maxWidth:860, margin:"0 auto", display:"flex", alignItems:"stretch" }}>
          {[["8,000+","community members"],["80+","curated resources"],["All 64","Colorado counties"]].map(([n,l],i,arr) => (
            <div key={l} style={{ flex:1, padding:"22px 24px", borderRight: i<arr.length-1 ? `1px solid ${C.g200}` : "none", display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:28, fontWeight:700, color:C.black, lineHeight:1, flexShrink:0 }}>
                {n.includes("+") ? <>{n.replace("+","")}<span style={{color:C.teal}}>+</span></> : n.includes(" ") ? <>{n.split(" ")[0]} <span style={{color:C.teal}}>{n.split(" ")[1]}</span></> : n}
              </div>
              <div style={{ fontSize:13, color:C.g600, lineHeight:1.4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 211 STRIP ── */}
      <div style={{ background:C.teal, padding:"14px clamp(16px,4vw,48px)" }}>
        <div style={{ maxWidth:860, margin:"0 auto", display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
          <span style={{ fontSize:16 }}>📞</span>
          <div style={{ flex:1, minWidth:180 }}>
            <span style={{ color:C.white, fontSize:14, fontWeight:600 }}>Need help right now? </span>
            <span style={{ color:"rgba(255,255,255,.88)", fontSize:14 }}>Dial <strong>2-1-1</strong> or search by ZIP at 211colorado.org — free, 24/7, works everywhere in Colorado.</span>
          </div>
          <a href="https://211colorado.org" target="_blank" rel="noreferrer" style={{ background:"rgba(255,255,255,.2)", color:C.white, padding:"7px 16px", borderRadius:99, fontSize:13, fontWeight:600, textDecoration:"none", border:"1px solid rgba(255,255,255,.3)" }} onMouseEnter={e=>e.target.style.background="rgba(255,255,255,.3)"} onMouseLeave={e=>e.target.style.background="rgba(255,255,255,.2)"}>Search →</a>
        </div>
      </div>

      {/* ── PHOTO STRIP ── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", height:200, overflow:"hidden" }}>
        {[IMG.strip1, IMG.strip2, IMG.strip3].map((src, i) => (
          <div key={i} style={{ position:"relative", overflow:"hidden" }}>
            <img src={src} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", filter:"brightness(0.85)" }} loading="lazy" />
            {i === 1 && (
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(35,53,78,.45)" }}>
                <div style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:18, fontWeight:700, color:C.white, textAlign:"center", lineHeight:1.4, padding:"0 16px" }}>
                  You are not alone.<br /><em style={{ color:C.pink }}>We see you.</em>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── SUB NAV ── */}
      <div style={{ background:C.white, borderBottom:`1px solid ${C.g200}`, position:"sticky", top:60, zIndex:99, boxShadow:"0 1px 8px rgba(0,0,0,.04)" }}>
        <div style={{ maxWidth:860, margin:"0 auto", display:"flex" }}>
          {[{id:"resources",label:"Resources & Support"},{id:"pros",label:"Divorce Professionals"},{id:"coming",label:"Directory — Coming Soon"}].map(t => (
            <button key={t.id} onClick={()=>setTab(t.id)} style={{ flex:1, padding:"15px 10px", background:"none", border:"none", borderBottom: tab===t.id ? `2px solid ${C.teal}` : "2px solid transparent", cursor:"pointer", fontFamily:"'DM Sans', system-ui, sans-serif", fontSize:12, fontWeight:600, color: tab===t.id ? C.teal : C.g400, whiteSpace:"nowrap", letterSpacing:"0.01em" }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:860, margin:"0 auto", padding:"40px 16px 80px" }}>

        {/* RESOURCES */}
        {tab==="resources" && (
          <div>
            <SectionLabel text="Always Free · All of Colorado" />
            <h2 style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:"clamp(26px,4vw,38px)", fontWeight:700, lineHeight:1.1, marginBottom:10, letterSpacing:"-0.02em" }}>Resources & Support</h2>
            <p style={{ fontSize:15, color:C.g600, lineHeight:1.75, marginBottom:28, maxWidth:560 }}>Real help for real situations — whether you're in Denver or on the Eastern Plains. You belong here.</p>

            <div style={{ background:C.g100, border:`1px solid ${C.g200}`, borderRadius:8, padding:"11px 14px", marginBottom:16, fontSize:12, color:C.g600, lineHeight:1.6 }}>ℹ️ Resource information is verified periodically but may change. Always call ahead to confirm availability and hours.</div>

            <div style={{ background:"#e8f4f3", border:"1px solid #b8dedd", borderRadius:10, padding:"13px 16px", marginBottom:24, display:"flex", gap:10, alignItems:"flex-start" }}>
              <span style={{ fontSize:15, flexShrink:0 }}>🌄</span>
              <div style={{ fontSize:13, color:C.tealD, lineHeight:1.65 }}><strong>Outside the Front Range?</strong> We've included county-specific resources throughout. If you don't see your area, dial <strong>211</strong> or search by ZIP — they have the most complete rural coverage of any directory.</div>
            </div>

            <div style={{ position:"relative", marginBottom:14 }}>
              <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", color:C.g400, fontSize:14 }}>🔍</span>
              <input value={rSearch} onChange={e=>setRSearch(e.target.value)} placeholder="Search by name, type, or county..." style={{ ...inp, paddingLeft:40 }} />
            </div>

            <div style={{ display:"flex", gap:7, overflowX:"auto", paddingBottom:8, marginBottom:28, scrollbarWidth:"none" }}>
              {CATEGORIES.map(c=>(
                <button key={c} onClick={()=>setActiveCat(c)} style={{ padding:"7px 16px", borderRadius:99, whiteSpace:"nowrap", fontFamily:"'DM Sans', system-ui, sans-serif", fontSize:12, fontWeight:600, cursor:"pointer", flexShrink:0, transition:"all .15s", background: activeCat===c ? C.teal : C.white, color: activeCat===c ? C.white : C.g600, border: activeCat===c ? "none" : `1px solid ${C.g200}`, boxShadow: activeCat===c ? `0 2px 8px rgba(63,167,160,.35)` : "none" }}>{c}</button>
              ))}
            </div>

            {(rSearch||activeCat!=="All") && (
              <div style={{ fontSize:13, color:C.g600, marginBottom:16 }}>
                {filteredAll.length} {filteredAll.length===1?"resource":"resources"} found
                {rSearch && <button onClick={()=>setRSearch("")} style={{ marginLeft:10, background:"none", border:"none", color:C.teal, fontSize:12, cursor:"pointer", fontFamily:"inherit", fontWeight:600 }}>Clear ✕</button>}
              </div>
            )}

            {sections.length===0 && (
              <div style={{ textAlign:"center", padding:"48px 16px", color:C.g600 }}>
                <div style={{ fontSize:36, marginBottom:14 }}>🔍</div>
                <div style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:18, color:C.black, marginBottom:8 }}>No results found</div>
                <div style={{ fontSize:14 }}>Try a different search term or browse by category above.</div>
              </div>
            )}

            {sections.map(section => {
              const isExp = expanded[section.catName]||!!rSearch||activeCat!=="All";
              const shown = isExp ? section.items : section.items.slice(0,3);
              return (
                <div key={section.catName} style={{ marginBottom:36 }}>
                  {activeCat==="All" && (
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14, paddingBottom:12, borderBottom:`1px solid ${C.g200}` }}>
                      <div style={{ width:3, height:20, background:C.teal, borderRadius:2, flexShrink:0 }} />
                      <span style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:18, fontWeight:700, color:C.black }}>{section.catName}</span>
                      <span style={{ fontSize:11, fontWeight:600, color:C.g400, background:C.g100, padding:"2px 9px", borderRadius:99, marginLeft:"auto", border:`1px solid ${C.g200}` }}>{section.items.length}</span>
                    </div>
                  )}
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>{shown.map(r=><RCard key={r.name} r={r} />)}</div>
                  {!rSearch&&activeCat==="All"&&section.items.length>3&&(
                    <button onClick={()=>toggleExpand(section.catName)} style={{ marginTop:10, background:C.white, border:`1px solid ${C.g200}`, borderRadius:99, padding:"8px 20px", fontSize:12, fontWeight:600, color:C.g600, cursor:"pointer", fontFamily:"'DM Sans', system-ui, sans-serif" }} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.teal;e.currentTarget.style.color=C.teal;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.g200;e.currentTarget.style.color=C.g600;}}>
                      {isExp ? "Show fewer ↑" : `Show all ${section.items.length} in this category →`}
                    </button>
                  )}
                </div>
              );
            })}

            <div style={{ background:C.black, borderRadius:16, padding:"32px 24px", marginTop:8, borderBottom:`4px solid ${C.pink}` }}>
              <SectionLabel text="Help Us Grow" dark />
              <h3 style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:24, fontWeight:700, color:C.white, marginBottom:8 }}>Know a resource we're missing?</h3>
              <p style={{ fontSize:14, color:"rgba(255,255,255,.5)", marginBottom:22, lineHeight:1.75 }}>Especially for rural communities — your local knowledge matters. We review every submission before it goes live.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <div><label style={lblD}>Resource Name</label><input style={inpDark} /></div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <div><label style={lblD}>Phone</label><input style={inpDark} /></div>
                  <div><label style={lblD}>Website</label><input style={inpDark} /></div>
                </div>
                <div><label style={lblD}>Area / County Served</label><input style={inpDark} placeholder="e.g. El Paso County, Statewide" /></div>
                <div><label style={lblD}>Category</label><select style={inpDark}>{CATEGORIES.filter(c=>c!=="All").map(c=><option key={c}>{c}</option>)}</select></div>
                <div><label style={lblD}>Description</label><textarea rows={3} placeholder="What does this resource offer? Who qualifies?" style={{ ...inpDark, resize:"vertical" }} /></div>
              </div>
              {resDone ? <div style={{ marginTop:14, color:C.pink, fontWeight:600 }}>✓ Thank you — sent for review!</div>
              : <button onClick={()=>setResDone(true)} style={{ marginTop:14, background:C.teal, color:C.white, border:"none", padding:"13px 28px", borderRadius:99, fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans', system-ui, sans-serif", width:"100%" }} onMouseEnter={e=>e.target.style.background=C.tealD} onMouseLeave={e=>e.target.style.background=C.teal}>Submit Resource →</button>}
            </div>
          </div>
        )}

        {/* PROFESSIONALS */}
        {tab==="pros" && (
          <div>
            <SectionLabel text="Community-Vetted" />
            <h2 style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:"clamp(26px,4vw,38px)", fontWeight:700, lineHeight:1.1, marginBottom:10, letterSpacing:"-0.02em" }}>Divorce Professionals</h2>
            <p style={{ fontSize:15, color:C.g600, lineHeight:1.75, marginBottom:24, maxWidth:560 }}>Attorneys, mediators, CDFAs, coaches, and paralegals recommended by Colorado women who've been there. Listings are community-sourced — professionals are invited to claim their profile.</p>
            <div style={{ background:"#e8f4f3", border:"1px solid #b8dedd", borderRadius:10, padding:"13px 16px", marginBottom:28, display:"flex", gap:10, alignItems:"flex-start" }}>
              <span style={{ fontSize:15, flexShrink:0 }}>💡</span>
              <div style={{ fontSize:13, color:C.tealD, lineHeight:1.65 }}>
                <strong>Know someone who should be here?</strong> Email us at <a href="mailto:thenextstepcolorado@gmail.com" style={{ color:C.teal, fontWeight:700 }}>thenextstepcolorado@gmail.com</a> to suggest a professional for the directory.
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px,1fr))", gap:20 }}>
              {PLACEHOLDER_PROS.map(pro => <ProCard key={pro.name} pro={pro} />)}
            </div>
          </div>
        )}

        {/* COMING SOON */}
        {tab==="coming" && (
          <div style={{ textAlign:"center", padding:"64px 16px" }}>
            <div style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:44, color:C.g200, marginBottom:24 }}>◈</div>
            <h2 style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:32, fontWeight:700, marginBottom:12 }}>Paid Professional Directory</h2>
            <p style={{ fontSize:15, color:C.g600, maxWidth:400, margin:"0 auto 32px", lineHeight:1.75 }}>Paid listings for verified divorce professionals are coming soon. Community listings are already live.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:12, maxWidth:300, margin:"0 auto" }}>
              <button onClick={()=>setTab("pros")} style={{ background:C.teal, color:C.white, border:"none", padding:"14px 28px", borderRadius:99, fontFamily:"'DM Sans', system-ui, sans-serif", fontSize:14, fontWeight:600, cursor:"pointer" }} onMouseEnter={e=>e.target.style.background=C.tealD} onMouseLeave={e=>e.target.style.background=C.teal}>See Community Listings →</button>
              <button onClick={()=>setShowEmail(true)} style={{ background:C.white, color:C.g600, border:`1px solid ${C.g200}`, padding:"14px 28px", borderRadius:99, fontFamily:"'DM Sans', system-ui, sans-serif", fontSize:14, fontWeight:500, cursor:"pointer" }}>Get Notified at Launch</button>
            </div>
          </div>
        )}
      </div>

      {/* EMAIL MODAL */}
      {showEmail && (
        <Modal onClose={()=>setShowEmail(false)}>
          <div style={{ fontSize:11, fontWeight:600, letterSpacing:"0.18em", textTransform:"uppercase", color:C.teal, marginBottom:12, display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ display:"inline-block", width:24, height:1, background:C.teal }} />Stay in the loop
          </div>
          <h3 style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:22, fontWeight:700, marginBottom:8 }}>Get notified when the professional directory launches</h3>
          <p style={{ fontSize:14, color:C.g600, lineHeight:1.7, marginBottom:22 }}>No spam, just the update. Unsubscribe anytime.</p>
          {emailDone ? (
            <div style={{ textAlign:"center", padding:"20px 0" }}>
              <div style={{ fontSize:36, marginBottom:12 }}>🌸</div>
              <div style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:20, fontWeight:700, marginBottom:6 }}>You're on the list!</div>
              <div style={{ fontSize:14, color:C.g600 }}>We'll be in touch when the directory launches.</div>
              <button onClick={()=>setShowEmail(false)} style={{ marginTop:20, background:C.teal, color:C.white, border:"none", padding:"12px 28px", borderRadius:99, fontFamily:"'DM Sans', system-ui, sans-serif", fontSize:14, fontWeight:600, cursor:"pointer" }}>Close</button>
            </div>
          ) : (
            <>
              <div style={{ marginBottom:12 }}><label style={lbl}>Your email address</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" style={inp} /></div>
              <div style={{ marginBottom:20 }}><label style={lbl}>I'm looking for (optional)</label><select style={inp}><option>— Select —</option>{PRO_SPECIALTIES.map(s=><option key={s}>{s}</option>)}</select></div>
              <button onClick={()=>email&&setEmailDone(true)} style={{ background:C.teal, color:C.white, border:"none", padding:"13px 28px", borderRadius:99, fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans', system-ui, sans-serif", width:"100%", opacity:email?1:.5 }} onMouseEnter={e=>{if(email)e.target.style.background=C.tealD;}} onMouseLeave={e=>e.target.style.background=C.teal}>Notify Me →</button>
              <div style={{ fontSize:11, color:C.g400, marginTop:12, textAlign:"center" }}>No spam. Unsubscribe anytime.</div>
            </>
          )}
        </Modal>
      )}

      {/* FOOTER */}
      <footer style={{ background:C.black, padding:"48px clamp(16px,4vw,48px)" }}>
        <div style={{ maxWidth:860, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:32 }}>
          <div>
            <div style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:18, fontWeight:600, color:C.white, marginBottom:6 }}>Next Step <span style={{ color:C.pink }}>Colorado</span></div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,.3)", marginBottom:4 }}>A free resource directory for Colorado women navigating divorce.</div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,.3)" }}>Powered by the Divorced &amp; Single Moms of Colorado community.</div>
          </div>
          <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:8 }}>
            {[["Privacy Policy","/privacy"],["Contact","mailto:thenextstepcolorado@gmail.com"],["Admin Login","#"]].map(([l,h])=>(
              <li key={l}><a href={h} style={{ fontSize:13, color:"rgba(255,255,255,.4)", textDecoration:"none" }} onMouseEnter={e=>e.target.style.color=C.white} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.4)"}>{l}</a></li>
            ))}
          </ul>
        </div>
        <div style={{ maxWidth:860, margin:"24px auto 0", paddingTop:24, borderTop:"1px solid rgba(255,255,255,.06)", fontSize:11, color:"rgba(255,255,255,.2)" }}>
          Resource information verified periodically. Always call ahead to confirm availability.
        </div>
      </footer>
    </div>
  );
}
