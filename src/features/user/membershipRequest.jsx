/* eslint-disable no-unused-labels */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import InputText from '../../components/Input/InputText'
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { apis } from '../../auth/apis';
import axios from 'axios';
import ErrorText from '../../components/Typography/ErrorText';
import InputDropdown from '../../components/Input/InputDropdown';
import { maritalStatusOptions, uhusianoOptions } from '../../utils/dummyData';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { message } from 'antd';
import { ClipLoader } from 'react-spinners';


const MemberRequest = () => {
  const INITIAL_OBJ = {
    name: '', slp: '', cheo: '', taasisi: '',
    idara: '', nida_namba: '', tarehe_ya_kuzaliwa: '', tarehe_ya_kuajiriwa: '', tarehe_ya_kustaafu: '', email: '',
    phone_number: '', location: '', mtaa: '', kata: '', wilaya: '', mkoa: '', mrithi: '', uhusiano: '', hadhi_ya_ndoa: '',
    mawasiliano_ya_mrithi: ''
  };

  const [activeTab, setActiveTab] = useState('sectionA');
  const [errorMessage, setErrorMessage] = useState("");
  const [requestObj, setRequestObj] = useState(INITIAL_OBJ);
  const [selectedMkoa, setSelectedMkoa] = useState(INITIAL_OBJ.mkoa);
  const [selectedWilaya, setSelectedWilaya] = useState(INITIAL_OBJ.wilaya);
  const [selectedKata, setSelectedKata] = useState(INITIAL_OBJ.kata)
  const [mikoaData, setMikoaData] = useState([]);
  const [wilayaData, setWilayaData] = useState({});
  const [kataData, setKataData] = useState({});
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false); // New state for payment success
  const [successPaymentData, setSuccessPaymentData] = useState({});
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const amount = 10000;

  const config = {
    public_key: 'FLWPUBK_TEST-ad169f46c21db341e24cbde5816d72bf-X',
    tx_ref: Date.now(),
    amount: amount,
    currency: 'TZS',
    // redirect_url: 'https://www.youtube.com/',
    payment_options: "card, mobilemoney, ussd, bank transfer",
    customer: {
      email: requestObj.email,
      phone_number: requestObj.phone_number,
      name: requestObj.name,
    },
    customizations: {
      title: 'Ada ya kiingilio',
      description: 'Malipo ya ada ya kiingilio',
    },
    // isTestMode: true,
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePaymentCallback = async (response) => {
    console.log('Payment response:', response);

    if (response.status === "successful") {
      message.success('Malipo yamekamilika')
      // Append the description field to the response data
      const paymentData = {
        ...response,
        description: 'kiingilio'
      };
      setSuccessPaymentData(paymentData);
      setIsPaymentSuccessful(true);
      message.success('Malipo yamekamilika.')
      // closes the Flutterwave payment modal after successful payment
      closePaymentModal();
    } else {
      // Payment failed
      message.error("Malipo hayakufanikiwa, tafadhali jaribu tena.")
      setErrorMessage("Malipo hayakufanikiwa, tafadhali jaribu tena.");
      setIsPaymentSuccessful(false);
    }
  };

  // Function to reset form inputs
  const resetForm = () => {
    setRequestObj(INITIAL_OBJ);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isPaymentSuccessful) {
      return;
    }

    // sending form data to a server
    try {
      const newRequestObj = {
        ...requestObj,
        successPaymentData
      };

      const response = await axios.post(apis.membershipRequest, newRequestObj);

      if (response.status === 201) {
        message.success("Ombi Limewasilishwa Kikamilifu");
        setErrorMessage("Ombi Limewasilishwa Kikamilifu");
        resetForm(); // Reset form inputs
        navigate('/')
      } else {
        message.error("Imefeli. Tafadhali jaribu tena")
        setErrorMessage("Imefeli. Tafadhali jaribu tena")
        throw new Error('Not success');
      }
    } catch (error) {
      message.error("Error")
      setErrorMessage("Error")
      console.error('There was an error!', error);
      navigate('/membershipRequest')
    }
  };

  useEffect(() => {
    const fetchMikoaData = async () => {
      try {
        const response = await axios.get(apis.getMikoaData);
        setMikoaData(response.data.mikoa);
        setWilayaData(response.data.wilaya);
        setKataData(response.data.kata);
      } catch (error) {
        console.error('There was an error fetching mikoa data!', error);
      }
    };
    fetchMikoaData();
  }, []);

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setRequestObj({ ...requestObj, [updateType]: value });

    if (updateType === 'mkoa') {
      setSelectedMkoa(value);
      setSelectedWilaya('');
      setSelectedKata('');

    } else if (updateType === 'wilaya') {
      setSelectedWilaya(value);
      setSelectedKata('');

    } else if (updateType === 'kata') {
      setSelectedKata(value);
    }
  };

  const mkoaOptions = mikoaData.map((mkoa) => ({
    value: mkoa,
    label: mkoa
  })).sort((a, b) => a.label.localeCompare(b.label));

  const wilayaOptions = selectedMkoa ? wilayaData[selectedMkoa].map((wilaya) => ({
    value: wilaya,
    label: wilaya
  })).sort((a, b) => a.label.localeCompare(b.label)) : [];

  const kataOptions = selectedMkoa && selectedWilaya ? kataData[selectedMkoa][selectedWilaya].map((kata) => ({
    value: kata,
    label: kata
  })).sort((a, b) => a.label.localeCompare(b.label)) : [];

  return (
    <div className="bg-blue-100 min-h-screen flex justify-center items-center">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <ClipLoader color="#ffffff" loading={loading} size={50} />
        </div>
      )}
      <div className="max-w-4xl max-h-2xl h-full w-full mx-auto bg-white elevation-5 rounded-lg overflow-hidden shadow-md px-8 py-8">
        <div className="flex items-center justify-between px-4 py-2 bg-white shadow-md">

          <h1 className="text-3xl font-bold text-gray-800">Fomu ya Kuomba Uanachama wa SACCOS</h1>

          <Link to="/" className="flex items-center text-blue-500 hover:text-blue-700">
            <ArrowLeftIcon className="w-4 h-4 m-1" />
            Rudi
          </Link>

        </div>
        <div className="border-b border-gray-500 mb-6"></div>

        <div className="flex justify-between px-4 mb-4">
          <button
            className={`text-lg font-semibold focus:outline-none ${activeTab === 'sectionA' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => handleTabChange('sectionA')}
          >
            SEHEMU A
          </button>

          <button
            className={`text-lg font-semibold focus:outline-none ${activeTab === 'sectionB' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => handleTabChange('sectionB')}
          >
            SEHEMU B
          </button>

        </div>
        {activeTab === 'sectionA' && (
          <form onSubmit={handleSubmit} method='POST'>

            <h1 className="text-xl font-bold text-black">TAARIFA ZA MWANACHAMA (Ijazwe na Mwombaji)</h1>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <InputText labelTitle="Jina Kamili" defaultValue={INITIAL_OBJ.name} updateType='name' updateFormValue={updateFormValue} placeholder="Ingiza majina yako kamili" required />

              <InputText type="email" labelTitle="Barua Pepe / Email " defaultValue={INITIAL_OBJ.email} updateType='email' updateFormValue={updateFormValue} placeholder="Ingiza anuani ya barua pepe" className="text-black" required />

              <InputText labelTitle="Namba ya Simu ya Mkononi" defaultValue={INITIAL_OBJ.phone_number} updateType='phone_number' updateFormValue={updateFormValue} placeholder="0********" className="text-black" required />

              <InputText labelTitle="S.L.P " defaultValue={INITIAL_OBJ.slp} updateType='slp' updateFormValue={updateFormValue} placeholder="sanduku la posta" className="text-black" />

              <InputText labelTitle="Cheo" defaultValue={INITIAL_OBJ.cheo} updateType='cheo' updateFormValue={updateFormValue} placeholder="cheo chako katika taasisi uliyoajiriwa kwa sasa" className="text-black" required />

              <InputText labelTitle="Wizara/Taasisi/Halmashauri " defaultValue={INITIAL_OBJ.taasisi} updateType='taasisi' updateFormValue={updateFormValue} placeholder="jina la taasisi ulioajiriwa" className="text-black" required />

              <InputText labelTitle="Idara" defaultValue={INITIAL_OBJ.idara} updateType='idara' updateFormValue={updateFormValue} placeholder="idara uliyopo" className="text-black" required />

              <InputText labelTitle="Nida Namba " defaultValue={INITIAL_OBJ.nida_namba} updateType='nida_namba' updateFormValue={updateFormValue} placeholder="namba yako ya NIDA" className="text-black" required />

              <InputText type="date" labelTitle="Tarehe ya Kuzaliwa" defaultValue={INITIAL_OBJ.tarehe_ya_kuzaliwa} updateType='tarehe_ya_kuzaliwa' updateFormValue={updateFormValue} placeholder="" className="text-black" required />

              <InputText type="date" labelTitle="Tarehe ya Kuajiriwa" defaultValue={INITIAL_OBJ.tarehe_ya_kuajiriwa} updateType='tarehe_ya_kuajiriwa' updateFormValue={updateFormValue} placeholder="" className="text-black" required />

              <InputText type="date" labelTitle="Tarehe ya Kustaafu" defaultValue={INITIAL_OBJ.tarehe_ya_kustaafu} updateType='tarehe_ya_kustaafu' updateFormValue={updateFormValue} placeholder="" className="text-black" required />

              <InputDropdown labelTitle="Mkoa" defaultValue={INITIAL_OBJ.mkoa} updateType='mkoa' updateFormValue={updateFormValue} options={mkoaOptions} />

              <InputDropdown labelTitle="Wilaya" defaultValue={INITIAL_OBJ.wilaya} updateType='wilaya' updateFormValue={updateFormValue} options={wilayaOptions} />

              <InputDropdown labelTitle="Kata" defaultValue={INITIAL_OBJ.kata} updateType='kata' updateFormValue={updateFormValue} options={kataOptions} />

              <InputText labelTitle="Mtaa/Kijiji" defaultValue={INITIAL_OBJ.mtaa} updateType='mtaa' updateFormValue={updateFormValue} placeholder="mf. Jeshini" className="text-black" required />

              <InputText labelTitle="Eneo la Makazi/Nambari ya nyumba" defaultValue={INITIAL_OBJ.location} updateType='location' updateFormValue={updateFormValue} placeholder="mf. Mbweni JKT" className="text-black" required />

              <InputDropdown labelTitle="Hadhi ya Ndoa" defaultValue={INITIAL_OBJ.hadhi_ya_ndoa} updateType='hadhi_ya_ndoa' updateFormValue={updateFormValue} options={maritalStatusOptions} />
            </div>

            <div className="border-b border-gray-500 mb-4"></div>

            <h1 className="text-xl font-bold text-black mb-2">MAELEZO YA MRITHI WA MWANACHAMA</h1>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <InputText labelTitle="Jina Kamili la Mrithi" defaultValue={INITIAL_OBJ.mrithi} updateType='mrithi' updateFormValue={updateFormValue} placeholder="Ingiza jina kamili la mrithi" className="text-black" required />

              <InputDropdown labelTitle="Uhusiano na Mrithi" defaultValue={INITIAL_OBJ.uhusiano} updateType='uhusiano' updateFormValue={updateFormValue} options={uhusianoOptions} />

              <InputText labelTitle="Mawasiliano ya Mrithi" defaultValue={INITIAL_OBJ.mawasiliano_ya_mrithi} updateType='mawasiliano_ya_mrithi' updateFormValue={updateFormValue} placeholder="Weka mawasiliano ya mrithi" className="text-black" required />
            </div>

            <div className="border-b border-gray-500 mb-6"></div>

            <div className="relative">

              <ErrorText styleClass={`mt-8 ${errorMessage === "Success" ? "text-green-500" : "text-red-500"}`}>{errorMessage}</ErrorText>

              {!isPaymentSuccessful
                ?
                <div className='relative'>
                  <ErrorText styleClass={'mt-8 text-red-600'}>
                    !! Lipia ada ya kiingilio (Jaza fomu kisha bofya kitufe cha malipo). <Link to='' className='text-blue-600' onClick={() => handleTabChange('sectionB')}>Soma hapa</Link>
                  </ErrorText>
                  <button
                    onClick={() => {
                      message.warning('subiri');
                      handleFlutterPayment({
                        callback: handlePaymentCallback,
                        onClose: () => {
                          console.log('Payment modal closed');
                        },
                      });
                    }}
                    className="btn mt-2 w-full btn-primary"
                  >
                    Fanya malipo
                  </button>
                </div>
                :
                <>
                  <button
                    type="submit"
                    className={`bg-blue-500 text-white py-2 px-4 w-full rounded btn-primary`}
                  // disabled={!isPaymentSuccessful}
                  >
                    Wasilisha
                  </button>
                </>
              }
            </div>
          </form>
        )}
        {activeTab === 'sectionB' && (
          <>
            <h1 className="text-xl font-bold text-black">MCHANGO NA MAKATO</h1>
            <div>
              <ul className='text-black p-4'>
                <li className='p-4'>
                  <b>KIINGILIO - </b> Kiasi cha Tshs 10,000/= kilipwe kwenye akaunti ya chama
                  Namba 01J109509980 yenye jina la SACCOS Savings and Credit Cooperative Society Ltd
                  iliopo CRDB Benki Vijana
                </li>
                <li className='p-4'>
                  <b>AKIBA - </b> Kiasi cha makato kwa mwezi kupitia mshahara (kisichopungua Tshs 30,000/=) na kuendelea
                </li>
                <li className='p-4'>
                  <b>HISA - </b> kiasi cha hisa 1 ni 30,000/=
                </li>
              </ul>

            </div>

            {/* <div className='flex justify-between pl-8 pr-8 pt-4'> */}

            {/* className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")} */}
            {/* {isPaymentDialogOpen && (
                <div>
                  {isPaymentSuccessful ? (
                    <p>Payment Successful</p>
                  ) : (
                    <p>Payment Failed</p>
                  )}
                  <button onClick={() => setIsPaymentDialogOpen(false)}>Close</button>
                </div>
              )}
            </div> */}
          </>
        )}
      </div>
    </div >
  );
};

export default MemberRequest;
