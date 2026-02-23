import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getProfileApi } from '../api/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faBuilding,
  faFileAlt,
  faIdCard,
  faMoneyBillWave,
  faCalendarAlt,
  faShieldAlt,
  faEdit,
  faCheckCircle,
  faClock,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import './Profile.css';

const Profile = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentLang = i18n.language;

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getProfileApi();

      if (res?.data?.status && res?.data?.data) {
        setProfile(res.data.data);
      } else {
        setError(t('noProfileData'));
      }
    } catch (err) {
      console.error('Profile Error:', err);

      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError(
          err.response?.data?.message ||
            err.message ||
            t('somethingWentWrong')
        );
      }
    } finally {
      setLoading(false);
    }
  }, [navigate, t]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);

    return date.toLocaleDateString(
      currentLang === 'ar' ? 'ar-EG' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );
  };

  const getProviderType = (type) => {
    if (!type) return '-';
    return t(`providerTypes.${type}`, { defaultValue: type });
  };

  const getSubscriptionStatus = (status) => {
    if (!status) return t('noSubscription');
    if (status === 'active') return t('active');
    if (status === 'expired') return t('expired');
    return t('noSubscription');
  };

  const getStatusConfig = (status) => {
    if (status === 'active') {
      return { icon: faCheckCircle, class: 'success', text: t('active') };
    }
    if (status === 'rejected') {
      return { icon: faTimesCircle, class: 'danger', text: t('rejected') };
    }
    return { icon: faClock, class: 'warning', text: t('pending') };
  };

  const getSubscriptionConfig = (status) => {
    if (status === 'active') {
      return { class: 'success', text: t('active') };
    }
    if (status === 'expired') {
      return { class: 'danger', text: t('expired') };
    }
    return { class: 'secondary', text: t('noSubscription') };
  };

  if (loading) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{t('loading')}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <div className="alert alert-warning">
          {t('noProfileData')}
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(profile.status);
  const subscriptionConfig = getSubscriptionConfig(profile.subscription_status);

  return (
    <div className="profile-page">
      <div className="container mt-5 pt-5">

        {/* Header */}
        <div className="profile-header">
          <div className="profile-cover">
            {profile.cover ? (
              <img src={profile.cover} alt="Cover" />
            ) : (
              <div className="cover-placeholder" />
            )}
          </div>

          <div className="profile-avatar">
            {profile.logo ? (
              <img
                src={profile.logo}
                alt={
                  profile?.name?.[currentLang] ||
                  profile?.name?.en ||
                  profile?.name?.ar ||
                  'avatar'
                }
              />
            ) : (
              <div className="avatar-placeholder">
                <FontAwesomeIcon icon={faUser} size="3x" />
              </div>
            )}
          </div>

          <button
            className="edit-btn"
            onClick={() => navigate('/edit-profile')}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>

        {/* Title */}
        <div className="profile-title text-center mt-3">
          <h2>
            {profile?.name?.[currentLang] ||
              profile?.name?.en ||
              profile?.name?.ar ||
              t('unknown')}
          </h2>

          <span className={`status-badge ${statusConfig.class}`}>
            <FontAwesomeIcon icon={statusConfig.icon} className="me-1" />
            {statusConfig.text}
          </span>

          <span className={`subscription-badge ${subscriptionConfig.class}`}>
            <FontAwesomeIcon icon={faShieldAlt} className="me-1" />
            {subscriptionConfig.text}
          </span>
        </div>

        {/* Info Section */}
        <div className="row mt-4">

          <div className="col-lg-6">
            <div className="profile-card">
              <h4 className="card-title">
                <FontAwesomeIcon icon={faUser} className="me-2" />
                {t('contactInfo')}
              </h4>

              <div className="info-item">
                <div className="info-icon">
                  <FontAwesomeIcon icon={faBuilding} />
                </div>
                <div className="info-content">
                  <span className="info-label">{t('providerType')}</span>
                  <span className="info-value">
                    {getProviderType(profile.provider_type)}
                  </span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="info-content">
                  <span className="info-label">{t('email')}</span>
                  <span className="info-value">{profile.email || '-'}</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="info-content">
                  <span className="info-label">{t('phone')}</span>
                  <span className="info-value">{profile.phone || '-'}</span>
                </div>
              </div>

            </div>
          </div>

          <div className="col-lg-6">
            <div className="profile-card">
              <h4 className="card-title">
                <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                {t('businessInfo')}
              </h4>

              <div className="info-item">
                <div className="info-content">
                  <span className="info-label">{t('commercialName')}</span>
                  <span className="info-value">
                    {profile.commercial_name || '-'}
                  </span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-content">
                  <span className="info-label">{t('commercialRecord')}</span>
                  <span className="info-value">
                    {profile.commercial_record_number || '-'}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Subscription */}
        <div className="profile-card subscription-card mt-4">
          <h4 className="card-title">
            <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
            {t('subscription')}
          </h4>

          <div className="subscription-details">
            <div>
              <strong>{t('subscriptionStatus')}:</strong>{' '}
              {getSubscriptionStatus(profile.subscription_status)}
            </div>

            <div>
              <strong>{t('expiresAt')}:</strong>{' '}
              {profile.subscription_expire_at
                ? formatDate(profile.subscription_expire_at)
                : '-'}
            </div>

            <div>
              <strong>{t('registrationDate')}:</strong>{' '}
              {formatDate(profile.created_at)}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;