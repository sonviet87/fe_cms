import { LoadingOverlay } from 'components/Common/LoadingOverlay';
import React from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import accountApi from 'api/accountAPI';
import WarrantyForm from '../components/WarrantyForm';
import warrantyAPI from 'api/warrantyAPI';
import fpApi from 'api/fpAPI';

function AdminWarrantyAddEditPage() {
  const [loading, setLoading] = React.useState(false);
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [warranty, setWarranty] = React.useState({});
  const [fps, setFPS] = React.useState([]);

  const navigate = useNavigate();

  const initialValue = {
    name: '',
    fp_id: '',
    start_day: '',
    end_day: '',
    phone: '',
    email: '',
    file_warranty: '',
    details: [
      {
        category: '',
        serial: '',
        time_warranty: '',
        type: 1,
      },
    ],
  };

  React.useEffect(() => {
    (async () => {
      const rs = await fpApi.getList();
      if (rs.status) {
        if (rs.status) {
          const fpRs = rs.data.data.map((item) => {
            return {
              id: item.id,
              name: item.code,
            };
          });
          setFPS(fpRs);
        }
      }
    })();
    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        const res = await warrantyAPI.get(id);
        console.log(res);
        if (res.status) {
          setWarranty({
            name: res.data.data.name ?? '',
            phone: res.data.data.phone ?? '',
            account: res.data.data.account ?? '',
            end_day: res.data.data.end_day,
            start_day: res.data.data.start_day,
            file_warranty: res.data.data.file_warranty ?? '',
            email: res.data.data.email,
            fp_id: res.data.data.fp_id,
            details: JSON.parse(res.data.data.details),
          });
        } else {
          toast.error(res.message);
          navigate('/admin/accounts');
        }
      } catch (error) {
        console.log('get account by id error', error);
      }
      setLoading(false);
    })();
  }, [id, navigate]);

  const handleFormSubmit = async (formValues) => {
    setLoading(true);
    try {
      let res;
      if (isEdit) {
        res = await warrantyAPI.update(id, formValues);
      } else {
        res = await warrantyAPI.add(formValues);
      }
      if (res.status) {
        console.log('res.message', res.message);
        if (res.data.status) {
          toast.success(res.message);
          navigate('/admin/warranty');
        } else {
          toast.error(res.data.message);
        }
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log('Error', error.message);
    }
    setLoading(false);
  };

  return (
    <WrapperPage>
      {loading && <LoadingOverlay />}
      <TitleForm lable={isEdit ? 'Cập nhật bảo hành' : 'Thêm bảo hành'} />

      {(!isEdit || Boolean(warranty)) && (
        <WarrantyForm
          initialValue={initialValue}
          onSubmit={handleFormSubmit}
          itemValue={warranty}
          isEdit={isEdit}
          fps={fps}
        />
      )}
    </WrapperPage>
  );
}

export default AdminWarrantyAddEditPage;
