import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedFade } from '@/components/AnimatedFade';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { GradientButton } from '@/components/GradientButton';
import { Pill } from '@/components/Pill';
import { ResponsiveContainer } from '@/components/ResponsiveContainer';
import { colors, gradients, radius, shadows, spacing, typography } from '@/constants/theme';
import psychologists from '@/data/psychologists.json';
import type { Psychologist } from '@/types/psychologist';

const data = psychologists as Psychologist[];

export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return data.map((p) => ({ id: p.id }));
}

const accentByIndex = [
  gradients.cool,
  gradients.warm,
  gradients.accent,
  gradients.heroDeep,
] as const;

function pickAccent(i: number) {
  const safe = i < 0 ? 0 : i % accentByIndex.length;
  return accentByIndex[safe] ?? accentByIndex[0]!;
}

type ContactPref = 'email' | 'phone';

export default function BookScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const index = data.findIndex((p) => p.id === id);
  const person = index >= 0 ? data[index] : undefined;
  const accent = pickAccent(index);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formats, setFormats] = useState<string[]>([]);
  const [preferred, setPreferred] = useState('');
  const [message, setMessage] = useState('');
  const [contactPref, setContactPref] = useState<ContactPref>('email');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  const toggleFormat = (f: string) => {
    setFormats((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  if (!person) {
    return (
      <View style={styles.root}>
        <GradientBackground colors={gradients.hero} blobs />
        <SafeAreaView style={styles.notFoundWrap}>
          <Text style={typography.heading}>Nie znaleziono profilu</Text>
          <GradientButton
            label="Wróć do listy"
            onPress={() => router.push('/psychologists')}
            style={{ marginTop: spacing.md }}
          />
        </SafeAreaView>
      </View>
    );
  }

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = 'Podaj imię i nazwisko';
    if (contactPref === 'email') {
      if (!email.trim() || !email.includes('@')) {
        e.email = 'Podaj poprawny e-mail';
      }
    } else {
      if (!phone.trim()) {
        e.phone = 'Podaj numer telefonu';
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = () => {
    if (!validate() || !person) return;

    const lines: (string | null)[] = [
      `Imię i nazwisko: ${name.trim()}`,
      `Preferowany sposób kontaktu: ${contactPref === 'email' ? 'e-mail' : 'telefon'}`,
      email.trim() ? `E-mail: ${email.trim()}` : null,
      phone.trim() ? `Telefon: ${phone.trim()}` : null,
      formats.length ? `Forma konsultacji: ${formats.join(', ')}` : null,
      preferred.trim() ? `Preferowany termin: ${preferred.trim()}` : null,
      '',
      message.trim() ? `Wiadomość:\n${message.trim()}` : null,
      '',
      '---',
      `Specjalista: ${person.name}`,
      `Specjalizacja: ${person.specialization}`,
      `Wysłane przez formularz online (stowarzyszenie-demo).`,
    ];
    const body = lines.filter((l) => l !== null).join('\n');
    const subject = `Zgłoszenie konsultacji u ${person.name}`;
    const url = `mailto:${person.directEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(url).catch(() => {
      // brak klienta poczty — pokazujemy success state i tak,
      // user moze skopiowac dane z podsumowania
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <View style={styles.root}>
        <GradientBackground colors={accent} blobs />
        <Stack.Screen options={{ title: 'Zgłoszenie wysłane' }} />
        <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <AnimatedFade>
              <ResponsiveContainer>
                <View style={styles.successHero}>
                  <View style={styles.successBadge}>
                    <Ionicons name="checkmark" size={36} color="#fff" />
                  </View>
                </View>
                <Text style={styles.successTitle}>Prawie gotowe!</Text>
                <Text style={styles.successSub}>
                  Otworzyliśmy Twojego klienta poczty z gotową wiadomością do{' '}
                  <Text style={{ fontWeight: '700' }}>{person.name}</Text>.
                  Sprawdź treść i kliknij „wyślij" w swojej aplikacji pocztowej.
                  Odezwiemy się do 24 godzin pod podany
                  {contactPref === 'email' ? ' adres e-mail' : ' numer telefonu'}.
                </Text>

                <GlassCard padding="lg" style={{ marginTop: spacing.lg }}>
                  <Text style={styles.summaryEyebrow}>Podsumowanie zgłoszenia</Text>
                  <SummaryRow label="Specjalista" value={person.name} />
                  <SummaryRow label="Specjalizacja" value={person.specialization} />
                  {formats.length ? <SummaryRow label="Forma" value={formats.join(', ')} /> : null}
                  {preferred ? <SummaryRow label="Preferowany termin" value={preferred} /> : null}
                  <SummaryRow label="Kontakt zwrotny" value={contactPref === 'email' ? email : phone || email} />
                </GlassCard>

                <GlassCard style={styles.note}>
                  <Text style={typography.muted}>
                    Jeśli klient pocztowy się nie otworzył, możesz wysłać
                    zgłoszenie ręcznie na{' '}
                    <Text style={{ fontWeight: '700', color: colors.ink }}>
                      {person.directEmail}
                    </Text>{' '}
                    — w polu „temat" wpisz: „Zgłoszenie konsultacji u {person.name}".
                  </Text>
                </GlassCard>

                <View style={styles.successActions}>
                  <GradientButton
                    label="Wróć do profilu"
                    icon="arrow-back"
                    variant="glass"
                    onPress={() => router.push(`/psychologists/${person.id}`)}
                  />
                  <GradientButton
                    label="Lista psychologów"
                    iconRight="arrow-forward"
                    onPress={() => router.push('/psychologists')}
                  />
                </View>
              </ResponsiveContainer>
            </AnimatedFade>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <GradientBackground colors={accent} blobs />
      <Stack.Screen options={{ title: `Konsultacja u ${person.name.split(' ')[0]}` }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <AnimatedFade>
              <ResponsiveContainer>
                <Pill label="Umów konsultację" tone="sage" />
                <Text style={styles.title}>Spotkaj się z {person.name.split(' ')[0]}</Text>

                {/* Per-person hero — different from generic /contact */}
                <View style={styles.personHero}>
                  <LinearGradient
                    colors={accent as unknown as string[]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.avatarRing}
                  >
                    <Image source={{ uri: person.photo }} style={styles.photo} />
                  </LinearGradient>
                  <View style={styles.personMeta}>
                    <Text style={styles.personName}>{person.name}</Text>
                    <Text style={styles.personSpec}>{person.specialization}</Text>
                  </View>
                </View>

                {/* Per-person facts grid */}
                <GlassCard padding="lg" style={{ marginBottom: spacing.lg }}>
                  <Text style={styles.summaryEyebrow}>Szczegóły u tego specjalisty</Text>
                  <SummaryRow label="Czas sesji" value={person.consultationDuration} icon="time-outline" />
                  <SummaryRow label="Cena" value={person.price} icon="pricetag-outline" />
                  <SummaryRow label="Dostępność" value={person.availability} icon="calendar-outline" />
                  <SummaryRow
                    label="E-mail bezpośredni"
                    value={person.directEmail}
                    icon="mail-outline"
                  />
                  <SummaryRow
                    label="Telefon bezpośredni"
                    value={person.directPhone}
                    icon="call-outline"
                  />
                </GlassCard>

                {/* Form */}
                <Text style={styles.formHeader}>Wypełnij zgłoszenie</Text>

                <Field
                  label="Imię i nazwisko"
                  value={name}
                  onChangeText={setName}
                  placeholder="Jan Kowalski"
                  error={errors.name}
                />

                <Text style={styles.label}>Preferowany sposób kontaktu</Text>
                <View style={styles.toggleRow}>
                  <TogglePill
                    label="E-mail"
                    active={contactPref === 'email'}
                    onPress={() => {
                      setContactPref('email');
                      setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                  />
                  <TogglePill
                    label="Telefon"
                    active={contactPref === 'phone'}
                    onPress={() => {
                      setContactPref('phone');
                      setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                  />
                </View>

                <Field
                  label={contactPref === 'email' ? 'E-mail' : 'E-mail (opcjonalnie)'}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="jan@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.email}
                />

                <Field
                  label={contactPref === 'phone' ? 'Telefon' : 'Telefon (opcjonalnie)'}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="+48 ..."
                  keyboardType="phone-pad"
                  error={errors.phone}
                />

                <Text style={styles.label}>
                  Forma konsultacji{' '}
                  <Text style={styles.labelHint}>(możesz wybrać kilka)</Text>
                </Text>
                <View style={styles.toggleRow}>
                  {person.consultationFormats.map((f) => (
                    <TogglePill
                      key={f}
                      label={f}
                      active={formats.includes(f)}
                      onPress={() => toggleFormat(f)}
                    />
                  ))}
                </View>

                <Field
                  label="Preferowany termin (opcjonalnie)"
                  value={preferred}
                  onChangeText={setPreferred}
                  placeholder="np. środa po 17:00"
                />

                <Field
                  label="Krótka wiadomość (opcjonalnie)"
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Z czym przychodzisz, czego potrzebujesz..."
                  multiline
                />

                <GradientButton
                  label="Wyślij zgłoszenie"
                  icon="paper-plane-outline"
                  onPress={onSubmit}
                  style={{ marginTop: spacing.md }}
                />

                <GlassCard style={styles.note}>
                  <Text style={typography.muted}>
                    Zgłoszenie trafi bezpośrednio do {person.name.split(' ')[0]}.
                    Jeżeli wolisz porozmawiać o doborze specjalisty, użyj{' '}
                    <Text
                      style={styles.link}
                      onPress={() => router.push('/contact')}
                    >
                      ogólnego kontaktu stowarzyszenia
                    </Text>
                    .
                  </Text>
                </GlassCard>
              </ResponsiveContainer>
            </AnimatedFade>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

function Field({
  label,
  error,
  multiline,
  ...rest
}: React.ComponentProps<typeof TextInput> & {
  label: string;
  error?: string | undefined;
  multiline?: boolean | undefined;
}) {
  return (
    <View style={{ marginBottom: spacing.md }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...rest}
        multiline={multiline}
        style={[
          styles.input,
          multiline && styles.inputMultiline,
          !!error && styles.inputError,
        ]}
        placeholderTextColor={colors.inkMuted}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

function TogglePill({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.togglePill, active && styles.togglePillActive]}
    >
      <Text style={[styles.togglePillText, active && styles.togglePillTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

function SummaryRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View style={styles.summaryRow}>
      {icon ? (
        <View style={styles.summaryIcon}>
          <Ionicons name={icon} size={16} color={colors.lavenderDeep} />
        </View>
      ) : null}
      <View style={{ flex: 1 }}>
        <Text style={styles.summaryLabel}>{label}</Text>
        <Text style={styles.summaryValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingTop: 96, paddingBottom: spacing.xxxl },

  title: {
    ...typography.display,
    fontSize: 30,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },

  personHero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  avatarRing: {
    padding: 4,
    borderRadius: radius.pill,
    ...shadows.soft,
  },
  photo: {
    width: 84,
    height: 84,
    borderRadius: radius.pill,
    backgroundColor: colors.bgWarm,
  },
  personMeta: { flex: 1 },
  personName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.ink,
    letterSpacing: -0.2,
  },
  personSpec: {
    color: colors.lavenderDeep,
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginTop: 4,
  },

  summaryEyebrow: {
    ...typography.label,
    color: colors.lavenderDeep,
    marginBottom: spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  summaryIcon: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  summaryLabel: {
    ...typography.label,
    color: colors.inkSoft,
    marginBottom: 2,
  },
  summaryValue: {
    fontSize: 15,
    color: colors.ink,
    fontWeight: '600',
  },

  formHeader: {
    ...typography.heading,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },

  label: {
    ...typography.label,
    color: colors.inkSoft,
    marginBottom: spacing.xs,
  },
  labelHint: {
    ...typography.label,
    color: colors.inkMuted,
    textTransform: 'none',
    letterSpacing: 0,
    fontWeight: '500',
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.ink,
  },
  inputMultiline: {
    minHeight: 96,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  inputError: {
    borderColor: '#DC2626',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 13,
    marginTop: 4,
  },

  toggleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  togglePill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  togglePillActive: {
    borderColor: colors.lavenderDeep,
    backgroundColor: '#EDE9FE',
  },
  togglePillText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.inkSoft,
    textTransform: 'capitalize',
  },
  togglePillTextActive: {
    color: colors.lavenderDeep,
  },

  link: {
    color: colors.lavenderDeep,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },

  note: { marginTop: spacing.lg },

  // success state
  successHero: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  successBadge: {
    width: 76,
    height: 76,
    borderRadius: radius.pill,
    backgroundColor: colors.sageDeep,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.glass,
  },
  successTitle: {
    ...typography.display,
    fontSize: 32,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  successSub: {
    ...typography.body,
    textAlign: 'center',
    color: colors.inkSoft,
    maxWidth: 520,
    alignSelf: 'center',
  },
  successActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },

  notFoundWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
});
