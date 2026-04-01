import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { Card, Button } from '../components';
import { useEarningsStore, useClaimsStore } from '../store';

interface PayoutConfirmationScreenProps {
  navigation: any;
  route: any;
}

export const PayoutConfirmationScreen: React.FC<PayoutConfirmationScreenProps> = ({
  navigation,
  route,
}) => {
  const amount = route?.params?.amount || 250;
  const claimId = route?.params?.claimId || 'claim-001';

  const addPayout = useEarningsStore((state) => state.addPayout);
  const updateClaimStatus = useClaimsStore((state) => state.updateClaimStatus);

  const scaleAnim = new Animated.Value(0);
  const checkAnim = new Animated.Value(0);

  useEffect(() => {
    addPayout(amount);
    updateClaimStatus(claimId, 'paid');

    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.timing(checkAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const formatCurrency = (amt: number) => `₹${amt.toLocaleString('en-IN')}`;

  const payoutDetails = [
    { label: 'Amount Received', value: formatCurrency(amount) },
    { label: 'Transaction ID', value: `TXN${Date.now().toString().slice(-8)}` },
    { label: 'Credit To', value: 'UPI - ******4567' },
    { label: 'Bank', value: 'HDFC Bank' },
    { label: 'Date & Time', value: new Date().toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.successHeader}>
          <Animated.View
            style={[
              styles.successCircle,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            <Text style={styles.successEmoji}>✓</Text>
          </Animated.View>

          <Text style={styles.successTitle}>Payout Confirmed!</Text>
          <Text style={styles.successSubtitle}>
            Your disruption compensation has been credited to your linked account.
          </Text>

          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Amount Received</Text>
            <Text style={styles.amountValue}>{formatCurrency(amount)}</Text>
          </View>
        </View>

        <Card variant="elevated" style={styles.detailsCard}>
          <View style={styles.detailsHeader}>
            <Text style={styles.detailsTitle}>Transaction Details</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusDot}>●</Text>
              <Text style={styles.statusText}>CREDITED</Text>
            </View>
          </View>

          <View style={styles.detailsList}>
            {payoutDetails.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.detailRow,
                  index === payoutDetails.length - 1 && styles.detailRowLast,
                ]}
              >
                <Text style={styles.detailLabel}>{item.label}</Text>
                <Text style={styles.detailValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </Card>

        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>💡</Text>
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>How Payouts Work</Text>
              <Text style={styles.infoText}>
                When a disruption is detected in your zone, GigShield automatically initiates a claim. Once verified, the payout is credited directly to your linked UPI account — no action needed from you.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.historyCard}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyIcon}>📊</Text>
            <Text style={styles.historyTitle}>Your Protection</Text>
          </View>
          <View style={styles.historyStats}>
            <View style={styles.historyStat}>
              <Text style={styles.historyStatValue}>₹850</Text>
              <Text style={styles.historyStatLabel}>Protected This Week</Text>
            </View>
            <View style={styles.historyStatDivider} />
            <View style={styles.historyStat}>
              <Text style={styles.historyStatValue}>12</Text>
              <Text style={styles.historyStatLabel}>Hours Covered</Text>
            </View>
            <View style={styles.historyStatDivider} />
            <View style={styles.historyStat}>
              <Text style={styles.historyStatValue}>₹49</Text>
              <Text style={styles.historyStatLabel}>Weekly Premium</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomActions}>
          <Button
            title="Back to Dashboard"
            onPress={() => navigation.navigate('Dashboard')}
            variant="primary"
            size="lg"
            style={styles.primaryButton}
          />
          <Button
            title="View Claim History"
            onPress={() => navigation.navigate('ClaimProgress')}
            variant="ghost"
            size="md"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    paddingHorizontal: spacing[6],
    paddingTop: spacing[8],
    paddingBottom: spacing[12],
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: spacing[8],
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors['secondary-container'],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[6],
    ...shadows.lg,
  },
  successEmoji: {
    fontSize: 48,
    color: colors['on-secondary-container'],
  },
  successTitle: {
    fontFamily: typography.fonts.headline,
    fontSize: typography.sizes['headline-lg'],
    fontWeight: typography.weights.extrabold,
    color: colors['on-surface'],
    textAlign: 'center',
    marginBottom: spacing[2],
    letterSpacing: typography.letterSpacing.tight,
  },
  successSubtitle: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes['body-md'],
    color: colors['on-surface-variant'],
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: '85%',
  },
  amountContainer: {
    alignItems: 'center',
    marginTop: spacing[6],
    paddingTop: spacing[6],
    borderTopWidth: 1,
    borderTopColor: colors['outline-variant'],
  },
  amountLabel: {
    fontFamily: typography.fonts.label,
    fontSize: typography.sizes['label-sm'],
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.widest,
    color: colors.outline,
    marginBottom: spacing[1],
  },
  amountValue: {
    fontFamily: typography.fonts.headline,
    fontSize: 48,
    fontWeight: typography.weights.extrabold,
    color: colors.primary,
    letterSpacing: typography.letterSpacing.tight,
  },
  detailsCard: {
    marginBottom: spacing[6],
    padding: spacing[5],
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[5],
    paddingBottom: spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: colors['outline-variant'],
  },
  detailsTitle: {
    fontFamily: typography.fonts.headline,
    fontSize: typography.sizes['title-md'],
    fontWeight: typography.weights.bold,
    color: colors['on-surface'],
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors['secondary-container'],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.full,
    gap: spacing[1],
  },
  statusDot: {
    color: colors.primary,
    fontSize: 8,
  },
  statusText: {
    fontFamily: typography.fonts.label,
    fontSize: typography.sizes['label-sm'],
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.widest,
    color: colors['on-secondary-container'],
  },
  detailsList: {
    gap: spacing[4],
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: colors['surface-container'],
  },
  detailRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  detailLabel: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes['body-md'],
    color: colors['on-surface-variant'],
  },
  detailValue: {
    fontFamily: typography.fonts.headline,
    fontSize: typography.sizes['body-md'],
    fontWeight: typography.weights.semibold,
    color: colors['on-surface'],
  },
  infoSection: {
    marginBottom: spacing[6],
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors['primary-container'],
    padding: spacing[4],
    borderRadius: borderRadius.default,
    gap: spacing[4],
  },
  infoIcon: {
    fontSize: 24,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontFamily: typography.fonts.headline,
    fontSize: typography.sizes['title-sm'],
    fontWeight: typography.weights.bold,
    color: colors['on-primary-container'],
    marginBottom: spacing[2],
  },
  infoText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes['body-sm'],
    color: colors['on-primary-container'],
    opacity: 0.8,
    lineHeight: 18,
  },
  historyCard: {
    backgroundColor: colors['surface-container'],
    padding: spacing[6],
    borderRadius: borderRadius.default,
    marginBottom: spacing[6],
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    marginBottom: spacing[5],
  },
  historyIcon: {
    fontSize: 24,
  },
  historyTitle: {
    fontFamily: typography.fonts.headline,
    fontSize: typography.sizes['title-md'],
    fontWeight: typography.weights.bold,
    color: colors['on-surface'],
  },
  historyStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyStat: {
    flex: 1,
    alignItems: 'center',
  },
  historyStatValue: {
    fontFamily: typography.fonts.headline,
    fontSize: typography.sizes['title-lg'],
    fontWeight: typography.weights.extrabold,
    color: colors.primary,
    marginBottom: spacing[1],
  },
  historyStatLabel: {
    fontFamily: typography.fonts.label,
    fontSize: typography.sizes['label-sm'],
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.widest,
    color: colors.outline,
    textAlign: 'center',
  },
  historyStatDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors['outline-variant'],
  },
  bottomActions: {
    gap: spacing[4],
  },
  primaryButton: {
    width: '100%',
  },
});